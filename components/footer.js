class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer id="footer">
			    Site made by <a href="https://github.com/miguelgss" target="_blank">miguelgss</a>
		    </footer>
        `

        var styleSheet = document.createElement("link");
        styleSheet.rel = "stylesheet";
        styleSheet.href = document.location.href.includes("pages") ? "../../styles/footer.css" : "styles/footer.css";
        document.head.append(styleSheet);
    }
}

customElements.define('footer-component', Footer);
