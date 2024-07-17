class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <nav>
                    <ul class="header-nav">
                        <li onclick="location.href='../index.html'">Home</li>
                        <li onclick="location.href='about.html'">About</li>
                        <li>Drawings</li>
                        <li>Dev. Projects</li>
                    </ul>
                </nav>
            </header>
        `

        var styleSheet = document.createElement("link");
        styleSheet.rel = "stylesheet";
        styleSheet.href = document.location.href.includes("pages") ? "../styles/header.css" : "styles/header.css";
        document.head.append(styleSheet);
    }
}

customElements.define('header-component', Header);
