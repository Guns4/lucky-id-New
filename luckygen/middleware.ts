import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting storage (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Security configuration
const SECURITY_CONFIG = {
    rateLimit: {
        windowMs: 60 * 1000, // 1 minute
        maxRequests: 100, // max 100 requests per minute per IP
    },
    blockedIPs: new Set<string>([
        // Add known malicious IPs here
    ]),
    allowedOrigins: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://luckygen.click',
        'https://www.luckygen.click',
    ],
};

// Rate limiting function
function rateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, {
            count: 1,
            resetTime: now + SECURITY_CONFIG.rateLimit.windowMs,
        });
        return true;
    }

    if (record.count >= SECURITY_CONFIG.rateLimit.maxRequests) {
        return false;
    }

    record.count++;
    return true;
}

// Clean up old rate limit records periodically
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
        if (now > record.resetTime) {
            rateLimitMap.delete(ip);
        }
    }
}, 60 * 1000); // Clean up every minute

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        'unknown';

    // 1. Block known malicious IPs
    if (SECURITY_CONFIG.blockedIPs.has(ip)) {
        console.warn(`🚫 Blocked request from malicious IP: ${ip}`);
        return new NextResponse('Access Denied', { status: 403 });
    }

    // 2. Rate Limiting
    if (!rateLimit(ip)) {
        console.warn(`⚠️ Rate limit exceeded for IP: ${ip}`);
        return new NextResponse('Too Many Requests', {
            status: 429,
            headers: {
                'Retry-After': '60',
            }
        });
    }

    // 3. SECURITY HEADERS - Enterprise Level Protection

    // Prevent clickjacking attacks
    response.headers.set('X-Frame-Options', 'DENY');

    // Prevent MIME type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // Enable XSS protection
    response.headers.set('X-XSS-Protection', '1; mode=block');

    // Referrer policy - don't leak URLs
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions policy - restrict browser features
    response.headers.set('Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    );

    // HSTS - Force HTTPS (only in production)
    if (process.env.NODE_ENV === 'production') {
        response.headers.set(
            'Strict-Transport-Security',
            'max-age=31536000; includeSubDomains; preload'
        );
    }

    // Content Security Policy (CSP) - Advanced Protection
    const cspDirectives = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:",
        "media-src 'self' https:",
        "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com",
        "frame-src 'self' https://www.youtube.com https://www.google.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
    ];

    response.headers.set(
        'Content-Security-Policy',
        cspDirectives.join('; ')
    );

    // CORS Protection
    const origin = request.headers.get('origin');
    if (origin) {
        if (SECURITY_CONFIG.allowedOrigins.includes(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin);
            response.headers.set('Access-Control-Allow-Credentials', 'true');
        }
    }

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400',
            },
        });
    }

    // 4. Block suspicious requests
    const userAgent = request.headers.get('user-agent') || '';
    const suspiciousPatterns = [
        /bot/i,
        /crawler/i,
        /spider/i,
        /scraper/i,
        /curl/i,
        /wget/i,
    ];

    // Allow legitimate bots (Google, Bing, etc.)
    const legitimateBots = [
        /googlebot/i,
        /bingbot/i,
        /slurp/i, // Yahoo
        /duckduckbot/i,
    ];

    const isSuspicious = suspiciousPatterns.some(pattern =>
        pattern.test(userAgent)
    );

    const isLegitimate = legitimateBots.some(pattern =>
        pattern.test(userAgent)
    );

    if (isSuspicious && !isLegitimate && process.env.NODE_ENV === 'production') {
        // Log but don't block in production (you can enable blocking if needed)
        console.warn(`⚠️ Suspicious user agent: ${userAgent} from IP: ${ip}`);
    }

    // 5. Protect against SQL injection in URL parameters
    const url = request.nextUrl.pathname + request.nextUrl.search;
    const sqlInjectionPatterns = [
        /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
        /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
        /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
        /((\%27)|(\'))union/i,
        /exec(\s|\+)+(s|x)p\w+/i,
    ];

    if (sqlInjectionPatterns.some(pattern => pattern.test(url))) {
        console.error(`🚨 SQL Injection attempt detected from IP: ${ip}, URL: ${url}`);
        return new NextResponse('Bad Request', { status: 400 });
    }

    // 6. Protect against XSS in URL parameters
    const xssPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
    ];

    if (xssPatterns.some(pattern => pattern.test(url))) {
        console.error(`🚨 XSS attempt detected from IP: ${ip}, URL: ${url}`);
        return new NextResponse('Bad Request', { status: 400 });
    }

    // 7. Log security events (in production, send to monitoring service)
    if (process.env.NODE_ENV === 'production') {
        // Here you can integrate with services like Sentry, LogRocket, etc.
        // Example: Sentry.captureMessage(`Request from ${ip} to ${url}`);
    }

    return response;
}

// Configure which routes use this middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
