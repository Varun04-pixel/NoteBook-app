import '../App.css'

function About() {
    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <h1 className="my-5">About NoteX</h1>
                <div className="container rounded-2 p-4 w-75 glass-effect">
                    <h3>NoteX</h3>
                    <p className="mt-3 ms-4">
                        NoteX is your personal digital notebook designed for you. We created NoteX to offer a simple, powerful, and beautiful space where you can capture thoughts, manage tasks, and stay organized without effort.
                    </p>
                    <h4 className="mt-4 mb-3">What We Offer</h4>
                    <ul>
                        <li className='mb-1'>
                            <strong>Effortless Note-Taking : &nbsp;</strong> Quickly jot down ideas, create checklists, and add reminders with a clean, intuitive editor.
                        </li>
                        <li className='mb-1'>
                            <strong>Secure Access : &nbsp;</strong> Your notes are private and protected. Access them anytime, anywhere, with our secure login and signup authentication.
                        </li>
                        <li>
                            <strong>Dynamic Interface : &nbsp;</strong> Enjoy a distraction-free writing experience, enhanced by our unique and dynamic background.
                        </li>
                    </ul>
                    <p className="fs-5 text-center mt-4 text-success">
                        <strong>Thank you !!</strong>
                    </p>
                </div>
            </div>
        </>
    )
}

export default About;