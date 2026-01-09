import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * API SECURITY ENDPOINT
 * Untuk logging security events dan monitoring
 */

// Security event types
type SecurityEventType =
    | 'login'
    | 'logout'
    | 'failed_login'
    | 'suspicious_activity'
    | 'xss_attempt'
    | 'sql_injection_attempt'
    | 'rate_limit_exceeded'
    | 'unauthorized_access'
    | 'data_breach_attempt';

interface SecurityLog {
    event_type: SecurityEventType;
    user_id?: string;
    ip_address?: string;
    user_agent?: string;
    url?: string;
    details?: any;
    severity: 'low' | 'medium' | 'high' | 'critical';
    timestamp: string;
}

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Get client information
        const ip = request.ip ||
            request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            'unknown';

        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Parse request body
        const body = await request.json();
        const { event_type, details, user_id } = body;

        // Validate event type
        const validEventTypes: SecurityEventType[] = [
            'login',
            'logout',
            'failed_login',
            'suspicious_activity',
            'xss_attempt',
            'sql_injection_attempt',
            'rate_limit_exceeded',
            'unauthorized_access',
            'data_breach_attempt',
        ];

        if (!validEventTypes.includes(event_type)) {
            return NextResponse.json(
                { error: 'Invalid event type' },
                { status: 400 }
            );
        }

        // Determine severity
        const severityMap: Record<SecurityEventType, 'low' | 'medium' | 'high' | 'critical'> = {
            login: 'low',
            logout: 'low',
            failed_login: 'medium',
            suspicious_activity: 'medium',
            xss_attempt: 'high',
            sql_injection_attempt: 'critical',
            rate_limit_exceeded: 'medium',
            unauthorized_access: 'high',
            data_breach_attempt: 'critical',
        };

        const severity = severityMap[event_type];

        // Create security log
        const securityLog: SecurityLog = {
            event_type,
            user_id,
            ip_address: ip,
            user_agent: userAgent,
            url: request.nextUrl.pathname,
            details,
            severity,
            timestamp: new Date().toISOString(),
        };

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log('[Security Event]', securityLog);
        }

        // In production, save to database
        if (process.env.NODE_ENV === 'production') {
            const { error } = await supabase
                .from('security_logs')
                .insert([securityLog]);

            if (error) {
                console.error('Error logging security event:', error);
            }

            // If critical event, send alert (implement your alert system)
            if (severity === 'critical') {
                await sendSecurityAlert(securityLog);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Security event logged'
        });

    } catch (error) {
        console.error('Error in security logging:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Send security alert for critical events
async function sendSecurityAlert(log: SecurityLog) {
    // Implement your alert system here
    // Examples:
    // - Send email to admin
    // - Send Slack/Discord notification
    // - Trigger PagerDuty alert
    // - Log to Sentry

    console.error('[CRITICAL SECURITY ALERT]', log);

    // Example: Send to external monitoring service
    // await fetch('https://your-monitoring-service.com/alert', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(log),
    // });
}

// GET endpoint untuk retrieve security logs (admin only)
export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Check if user is admin
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check if user has admin role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profile?.role !== 'admin') {
            return NextResponse.json(
                { error: 'Forbidden - Admin access required' },
                { status: 403 }
            );
        }

        // Get query parameters
        const url = new URL(request.url);
        const limit = parseInt(url.searchParams.get('limit') || '50');
        const severity = url.searchParams.get('severity');
        const eventType = url.searchParams.get('event_type');

        // Build query
        let query = supabase
            .from('security_logs')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(limit);

        if (severity) {
            query = query.eq('severity', severity);
        }

        if (eventType) {
            query = query.eq('event_type', eventType);
        }

        const { data: logs, error } = await query;

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            logs,
            count: logs?.length || 0
        });

    } catch (error) {
        console.error('Error retrieving security logs:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
