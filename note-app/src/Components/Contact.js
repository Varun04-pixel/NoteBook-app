import '../App.css'

function Contact() {
    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <h1 className="my-5">Contact </h1>
                <div className="container rounded-2 glass-effect p-4 w-75">
                    <h3>Get in touch.</h3>
                    <p className="ms-3 mt-3">
                        Have a question, found a bug, or have a suggestion for NoteX? i'd be happy to hear it from you. Feel free to reach out to
                        me.
                    </p>
                    <h4 className="mt-4">Contact Information :</h4>
                    <ul className="list-unstyled">
                        <li>
                            <div className="d-flex flex-wrap align-items-center ms-3 mt-3">
                                <img
                                    width="36"
                                    height="32"
                                    src="https://img.icons8.com/color/48/new-post.png"
                                    alt="email icon"
                                    className="me-3"
                                />
                                <div>
                                    <span className="mb-0">
                                        <strong>Email : </strong>
                                    </span>
                                    &nbsp;&nbsp;
                                    <span className="mb-0"><a className="text-decoration-none text-primary" href="mailto:varunshinde04vrn@gmail.com">varunshinde04vrn@gmail.com</a></span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex align-items-center ms-3 mt-2">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAAAsTAAALEwEAmpwYAAADvklEQVR4nO2Y60tUQRTA90Mv/VT9C0EfIvzih/bOGlqQ9CAiygIplNS5aq5m0ZdeahFFqVmaaLmJpIiGaebO7PpaH2VkusXqJptuFr3ExIoQ1FxPzNXNx967dx9XCerAgQtzz8zvnjNnzpmrUv2Xf10StpAgnqMpPCL3eERbMUe6mPKItmBEdWwsnjNuXhYYHFwbyBbEiL7mEQVPFHPUihHRMtulgVIbIjGiXzwFcgUknzDSH1YMKC3UtIJHJM9XIN7Vg3ciNlWu8gsqRm1Yz/aPUlD8nPdMbG6foHBw10qeI81KQ/FO5Wi7T57DiBTMn+jMvna4Ft0FSaH1XkOkbG+ErBgznN5lWug5RHXeQakNkYsnL08fBHs9QN/jX1BxcVBYTA7oVHgzPLz6AWz6KcG26FSf63saesjDENYGimVfU8GIMLlTbXVTYCocgXbdNzBXjMGrqnFB2XOb7hu06UbhDXUssHl0/aPrfkP0Y6q6MkAWbObQdP36tqLRBYv4oiTni7h3NYYkeY8h0iNm3HB72G+w2sxPkoewfJkRMcyIeAYDhmm/wfrpNKRHdIh7LYRs8jqMjflf/Yayz2pD/rC41xDRSoeRI8WLDbRhDcKXKgXWT6dBu61BLJxF0h5DtEUsjEpB2Wf1woGnIgcuaXaz8al5scHVoy8UB7typFMknKTbncc6XTx2SHmPpYskAEbkuZs9RvWLDU6GN8GAUTmoASNA6o4mMbDH7kKpE8uYjpIfioE9Kf4uUdTJXTceI1jMiBVgpcAyj5klTn8SIwkWG6LfKFWQH1x65zdURcagZMHHiGyQBJtJANItZVyQYgVrzaTXQL01E5Cf3OsGiprdQs2A6eOcBgkaA+QmWiDt4FwWJYXVQ26CBfTZn6GrfEwSho3VZX2GW4kW0Mr3cNEe3oTIe2YQr6FQdt4u1Mn7ZwdcJrwR91ISLDv2pRyMM4SDUaGmNbJgs+HcPd+48IRVSPOsmIUbl/VdUmCtRaOegWnIXo+g/ngO0RKnceJWI/RUT4CNOIQu9Nz+J0J4WTcrBWatnZSH4kixylthFwWMaJNzkrzjFq8O2r66KTmwVu1OslrliySE1K3DHGlzTnY58jkYbg5BZ9lPoaPtN077BMaub1Gh1WtV/gj7KrF2iEdUWNxbMFZd/L7wzhfM0T08R976CoY5amdJpVoKSVVXBrDSwQ5hobi7abfZGCvW7A9QPEeOeXQTUkJIzlCQpWo82aZ3lNrIVL3N4OgWlD3rHaVsjL2zLDD/RfUXy2/JhDgMXVDnEwAAAABJRU5ErkJggg==" alt="github--v1" className="me-3" />
                                <div>
                                    <span className="mb-0">
                                        <strong>Github : </strong>
                                    </span>
                                    &nbsp;&nbsp;
                                    <span className="mb-0"><a className="text-decoration-none text-primary" href="https://github.com/Varun04-pixel/NoteBook-app" target="_blank">NoteX-app</a></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p className="fs-5 text-center mt-4 text-success">
                        <strong>Thank you for using NoteX !!</strong>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Contact;