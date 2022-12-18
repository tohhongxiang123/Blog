import React from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';

export default function About() {
    return (
        <Layout title="Support Me!" description="Support me by donating!">
            <div className="p-4 flex flex-col items-center">
                <h1 className="text-center text-5xl lg:text-7xl font-bold mb-12">
                    Donate to me
                </h1>
                <p className="text-xl opacity-80">
                    If you think that I have helped you, do feel free to fund my
                    holiday plans through paylah. Thanks!
                </p>
                <Image alt="Paylah QR" src="/paylah_qr.jfif" width={500} height={500} />
            </div>
        </Layout>
    );
}
