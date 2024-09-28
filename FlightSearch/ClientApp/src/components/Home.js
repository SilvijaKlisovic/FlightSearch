import React, { Component } from 'react';
import backgroundImage from '../images/Me.jpg';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div style={{
                padding: '15px',
                backgroundColor: 'lightgreen',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: '30%',
                backgroundRepeat: 'no-repeat', // Sprjeèava ponavljanje slike
                backgroundPosition: 'top right' // Pozicionira sliku u gornji desni kut
                }
            }>
                <h1>Hello, world!</h1>
                <h2>I'm Silvija</h2>
                <p style={{ width: '70%' }}>
                    As a Math student, I fell in love with programming.
                    I made my laptop do something sweet once, and now I am chasing that feeling of accomplishment each and every day. As experienced developer, I faced many, seemingly unresolvable, challenges during my career, but I never let them win.
                </p>
                <p style={{ width: '70%' }}>
                    I started as a Junior Developer working on different modules for HRNET,
                    HRnet premium software for human resources using ASP.NET and MS SQL.
                    I was involved in the architecture, design, and development process of
                    several different modules for the HRNET application (Recruitment, Onboarding, Personnel Records, and Organization).
                    I am working on the implementation of new features and improvements in the HRnet. 
                    After a lot of successful projects, I became the owner of 4 modules of this application.
                </p>
                <p style={{ width: '70%' }}>
                    On this career path, I honed my database skills in MS SQL, ASP.NET VB, and C#, reaching the intermediate developer level.
                    With these competencies, I contribute significantly to various projects. I developed, set up, parameterized, and implemented
                    the HRNET application with employment business processes (from the business need for new employees and planning to
                    employee selection and onboarding) in over 20 different companies, several of which have over 10,000 active employees.
                    Worked on large scale and international projects, integrating HRNET with other business applications.
                    Consulting customers in best business practices for Employment processes.
                </p>
                <p style={{ width: '70%' }}>
                    My responsibilities include designing, programming, and optimizing databases, importing data, implementing applications,
                    parameterizing, customizing, developing web applications, setting up, and ensuring data integration through APIs.
                    I participate in all phases of the project, from planning to implementation, to ensure successful product delivery and long-
                    term user satisfaction. I approach each project not only to achieve goals but also with the intention of recognizing
                    opportunities for my own growth and development.
                </p>
                <p> I believe that this approach not only ensures the completion
                    of each task but also provides an opportunity to raise the bar of success.
                </p>
                <p>
                    My mission is for everyone who works with me to feel confortable that we are working together toward the same goals. I always try to be honest and fair, because that is the way we build trust among each other.
                </p>
            </div >
        );
    }
}
