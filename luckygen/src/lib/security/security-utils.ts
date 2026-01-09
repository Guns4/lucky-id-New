/**
 * SECURITY UTILITIES
 * Utility functions untuk melindungi website dari berbagai serangan
 */

// ==========================================
// INPUT SANITIZATION & VALIDATION
// ==========================================

/**
 * Sanitize user input untuk prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';

    return input
        .replace(/[<>]/g, '') // Remove < and >
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .trim();
}

/**
 * Sanitize HTML content - more strict
 */
export function sanitizeHTML(html: string): string {
    if (typeof html !== 'string') return '';

    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) return false;
    if (email.length > 254) return false; // RFC 5321

    const parts = email.split('@');
    if (parts[0].length > 64) return false; // Local part max length

    return true;
}

/**
 * Validate URL format and prevent malicious URLs
 */
export function isValidURL(url: string): boolean {
    try {
        const urlObj = new URL(url);

        // Only allow http and https protocols
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
            return false;
        }

        // Block localhost and private IPs in production
        if (process.env.NODE_ENV === 'production') {
            const hostname = urlObj.hostname.toLowerCase();
            if (
                hostname === 'localhost' ||
                hostname.startsWith('192.168.') ||
                hostname.startsWith('10.') ||
                hostname.startsWith('127.')
            ) {
                return false;
            }
        }

        return true;
    } catch {
        return false;
    }
}

/**
 * Validate and sanitize username
 */
export function sanitizeUsername(username: string): string {
    return username
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '')
        .slice(0, 30); // Max 30 characters
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }

    if (password.length > 128) {
        errors.push('Password must be less than 128 characters');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

// ==========================================
// SQL INJECTION PREVENTION
// ==========================================

/**
 * Detect potential SQL injection patterns
 */
export function containsSQLInjection(input: string): boolean {
    const sqlPatterns = [
        /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
        /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
        /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
        /((\%27)|(\'))union/i,
        /exec(\s|\+)+(s|x)p\w+/i,
        /UNION.*SELECT/i,
        /INSERT.*INTO/i,
        /DELETE.*FROM/i,
        /DROP.*TABLE/i,
        /UPDATE.*SET/i,
    ];

    return sqlPatterns.some(pattern => pattern.test(input));
}

// ==========================================
// XSS PREVENTION
// ==========================================

/**
 * Detect potential XSS patterns
 */
export function containsXSS(input: string): boolean {
    const xssPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi,
        /eval\(/gi,
        /expression\(/gi,
    ];

    return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * Escape HTML entities
 */
export function escapeHTML(text: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };

    return text.replace(/[&<>"'/]/g, char => map[char]);
}

// ==========================================
// RATE LIMITING HELPERS
// ==========================================

interface RateLimitResult {
    success: boolean;
    remaining: number;
    reset: number;
}

/**
 * Client-side rate limiting helper
 */
export function checkRateLimit(
    key: string,
    limit: number,
    windowMs: number
): RateLimitResult {
    const now = Date.now();
    const storageKey = `rateLimit_${key}`;

    const data = localStorage.getItem(storageKey);
    let record = data ? JSON.parse(data) : null;

    if (!record || now > record.reset) {
        record = {
            count: 1,
            reset: now + windowMs,
        };
        localStorage.setItem(storageKey, JSON.stringify(record));

        return {
            success: true,
            remaining: limit - 1,
            reset: record.reset,
        };
    }

    if (record.count >= limit) {
        return {
            success: false,
            remaining: 0,
            reset: record.reset,
        };
    }

    record.count++;
    localStorage.setItem(storageKey, JSON.stringify(record));

    return {
        success: true,
        remaining: limit - record.count,
        reset: record.reset,
    };
}

// ==========================================
// CSRF PROTECTION
// ==========================================

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string, sessionToken: string): boolean {
    return token === sessionToken;
}

// ==========================================
// SECURE RANDOM GENERATORS
// ==========================================

/**
 * Generate secure random string
 */
export function generateSecureRandom(length: number = 32): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate secure OTP code
 */
export function generateOTP(length: number = 6): string {
    const digits = '0123456789';
    let otp = '';

    const array = new Uint8Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        otp += digits[array[i] % digits.length];
    }

    return otp;
}

// ==========================================
// DATA ENCRYPTION (CLIENT-SIDE)
// ==========================================

/**
 * Simple encryption for sensitive data in localStorage
 * Note: For production, use proper encryption libraries
 */
export async function encryptData(data: string, key: string): Promise<string> {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    const encodedKey = encoder.encode(key);

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        encodedKey,
        { name: 'AES-GCM' },
        false,
        ['encrypt']
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        encodedData
    );

    const result = new Uint8Array(iv.length + encrypted.byteLength);
    result.set(iv);
    result.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...result));
}

/**
 * Simple decryption for sensitive data from localStorage
 */
export async function decryptData(encryptedData: string, key: string): Promise<string> {
    const encoder = new TextEncoder();
    const encodedKey = encoder.encode(key);

    const data = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    const iv = data.slice(0, 12);
    const encrypted = data.slice(12);

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        encodedKey,
        { name: 'AES-GCM' },
        false,
        ['decrypt']
    );

    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        encrypted
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
}

// ==========================================
// SECURITY AUDIT LOGGING
// ==========================================

export interface SecurityEvent {
    type: 'login' | 'logout' | 'failed_login' | 'suspicious_activity' | 'data_access';
    userId?: string;
    ip?: string;
    userAgent?: string;
    details?: any;
    timestamp: number;
}

/**
 * Log security events (send to backend in production)
 */
export function logSecurityEvent(event: SecurityEvent): void {
    const log = {
        ...event,
        timestamp: Date.now(),
    };

    // In production, send this to your backend/monitoring service
    if (process.env.NODE_ENV === 'production') {
        // Example: fetch('/api/security/log', { method: 'POST', body: JSON.stringify(log) });
        console.log('[Security Event]', log);
    } else {
        console.log('[Dev Security Event]', log);
    }
}

// ==========================================
// FILE UPLOAD VALIDATION
// ==========================================

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Validate uploaded file
 */
export function validateFileUpload(file: File): {
    isValid: boolean;
    error?: string;
} {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        return {
            isValid: false,
            error: 'File size exceeds 5MB limit',
        };
    }

    // Check file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return {
            isValid: false,
            error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed',
        };
    }

    // Check file extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    if (!extension || !allowedExtensions.includes(extension)) {
        return {
            isValid: false,
            error: 'Invalid file extension',
        };
    }

    return { isValid: true };
}

// ==========================================
// EXPORTS
// ==========================================

export const SecurityUtils = {
    sanitizeInput,
    sanitizeHTML,
    isValidEmail,
    isValidURL,
    sanitizeUsername,
    validatePasswordStrength,
    containsSQLInjection,
    containsXSS,
    escapeHTML,
    checkRateLimit,
    generateCSRFToken,
    validateCSRFToken,
    generateSecureRandom,
    generateOTP,
    encryptData,
    decryptData,
    logSecurityEvent,
    validateFileUpload,
};
