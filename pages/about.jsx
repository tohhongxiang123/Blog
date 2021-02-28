import React from 'react'
import Layout from '../components/Layout'

export default function About() {
    return (
        <Layout>
            <div className="p-4">
                <section className="flex flex-col justify-center items-center p-16 pb-32 border-gray-300 border-b border-solid">
                    <h1 className="text-center">Toh Hong Xiang</h1>
                    <ul className="list-inside p-0 m-0 flex">
                        <li className="mx-4"><a href="https://github.com/tohhongxiang123" target="_blank" rel="noopener noreferrer">Github</a></li>
                        <li className="mx-4"><a href="https://www.linkedin.com/in/toh-hong-xiang-31551118b/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    </ul>
                </section>
                <section className="flex flex-col justify-center items-center p-16">
                    <h2>Skills</h2>
                    <ul className="list-disc">
                        <li>HTML, CSS, Javascript</li>
                        <li>Typescript</li>
                        <li>ReactJS</li>
                        <li>NodeJS</li>
                        <li>jQuery</li>
                        <li>SCSS</li>
                        <li>Bootstrap</li>
                        <li>TailwindCSS</li>
                        <li>MongoDB</li>
                        <li>SQL</li>
                        <li>PostgreSQL</li>
                        <li>GraphQL/REST APIs</li>
                        <li>TypeORM</li>
                        <li>Express</li>
                        <li>Github/GitTea/Gitlab</li>
                        <li>Github Actions</li>
                        <li>Photoshop/Figma</li>
                        <li>Heroku</li>
                        <li>Python</li>
                    </ul>
                </section>
            </div>
        </Layout>
    )
}
