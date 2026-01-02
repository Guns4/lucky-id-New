import { TopLeaderboardAd } from './AdUnit';

/**
 * Top Leaderboard Ad Slot
 * Placement: Above main content (728x90 desktop / 320x100 mobile)
 * CLS Prevention: Fixed min-height of 90px
 */
export default function TopLeaderboard() {
    return (
        <div className="w-full bg-gray-100/5 py-2">
            <div className="container mx-auto px-4">
                <TopLeaderboardAd slotId="1234567890" />
            </div>
        </div>
    );
}
