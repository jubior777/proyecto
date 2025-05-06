import React from 'react'

const Loader = () => (
    <div className='p-16 max-w-256 m-auto flex justify-center'>
        <section className='pt-16'>
            <svg
                width="90px"
                height="90px"
                viewBox="0 0 50 50"
                version='1.1'
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace='preserve'
                className='spin'
            >
                <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="#d4e3ef"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="31.4 31.4"
                    transform="rotate(0 25 25)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </section>
    </div>
)

export default Loader;
