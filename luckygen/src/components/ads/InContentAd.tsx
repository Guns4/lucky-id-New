import { MediumRectangleAd } from './AdUnit';

/**
 * In-Content Ad Slot (Medium Rectangle)
 * Placement: Between content sections (300x250)
 * CLS Prevention: Fixed min-height of 250px
 */
export default function InContentAd() {
    return (
        <div className="w-full py-8">
            <div className="container mx-auto px-4">
                <MediumRectangleAd slotId="9876543210" />
            </div>
        </div>
    );
}
