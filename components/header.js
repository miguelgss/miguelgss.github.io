class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <nav>
                    <ul class="header-nav">
                        <li>Título bem zica</li>
                        <li><a href="pages/about.html"> About </a></li>
                        <li>Item</li>
                        <li>Item</li>
                        <li>Item</li>
                    </ul>
                </nav>
            </header>
        `

        var styleSheet = document.createElement("link");
        styleSheet.rel = "stylesheet";
        styleSheet.href = document.location.href.includes("pages") ? "../styles/header.css" : "styles/header.css";
        document.head.append(styleSheet);
        console.log(document.location.href);
    }
}

customElements.define('header-component', Header);
