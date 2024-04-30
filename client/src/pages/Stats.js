import React from 'react'

function Stats() {
    return (
        <>
            <div className="statistics">
                <h1 class="electrified-title font-48 mar-bot-50 black fw-500 desktop-only">Global mobility ecosystem driving communities forward</h1>
                <div class="flex-space-between statistics-flex-mb container hero-container">
                    <div class="flex-column-center statistics-row-mb">
                        <object type="image/svg+xml" class="cities-covered-img" data="https://s3-ap-southeast-1.amazonaws.com/ola-prod-website/cts-covered.svg" name="cities-covered"></object>
                        <div class="desktop-only">
                            <p class="title-1 fw-500 font-40 lh-48 text-center">50+</p>
                            <p class="title-2 font-28 lh-32 fw-500 text-center">Spots covered</p>
                            {/* <p class="title-3 font-16 fw-400 lh-24 text-center">Across India, Australia, New Zealand and the UK</p> */}
                        </div>
                    </div>
                    <div class="flex-column-center statistics-row-mb">
                        <object type="image/svg+xml" class="cities-covered-img" data="https://s3-ap-southeast-1.amazonaws.com/ola-prod-website/year-rides.svg" name="yearly-rides"></object>
                        <div class="desktop-only">
                            <p class="title-1 fw-500 font-40 lh-48 text-center">5500+</p>
                            <p class="title-2 font-28 lh-32 fw-500 text-center">Yearly rides</p>
                            {/* <p class="title-3 font-16 fw-400 lh-24 text-center">Booked by our customers every year</p> */}
                        </div>
                    </div>
                    <div class="flex-column-center statistics-row-mb">
                        <object type="image/svg+xml" class="cities-covered-img" data="https://s3-ap-southeast-1.amazonaws.com/ola-prod-website/kms-covered.svg" name="kms-covered"></object>
                        <div class="desktop-only">
                            <p class="title-1 fw-500 font-40 lh-48 text-center">12 +</p>
                            <p class="title-2 font-28 lh-32 fw-500 text-center">Kilometers on S1</p>
                            {/* <p class="title-3 font-16 fw-400 lh-24 text-center">Distance covered on Ola S1 scooters within a year of launch</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Stats
