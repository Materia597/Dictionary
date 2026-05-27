class NavBar extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' })

        shadow.innerHTML = `
            <style>
                nav {
                    width:100%;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    background: var(--bg);
                    border-radius: var(--margin-xl);
                    padding: var(--margin-xs) var(--margin-xs);
                    gap: var(--margin-l);
                    justify-content: space-between;
                    flex-wrap: nowrap;
                }


                nav .nav-left {
                    flex: 1 0 auto;
                    margin-left: var(--margin-xs);
                }

                nav .nav-center {
                    flex: 4 0 auto;
                }

                nav .nav-right {
                    flex: 1 0 auto;
                    display: flex;
                    align-items: center;
                    gap: var(--margin-l);
                    justify-content: flex-end;
                    margin-right: var(--margin-xs);
                }

                nav p {
                    margin: 0;
                    padding: 0;
                    font-size: var(--margin-m);
                    font-weight: bold;
                }

                .search {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    padding: var(--margin-xs);
                    border-radius: var(--margin-xl);
                    background: var(--bg-light);
                    border: 1px solid var(--border);
                }

                .search-input {
                    background: transparent;
                    border: none;
                    color: var(--text);
                    margin-left: var(--margin-xs);
                    outline: none;
                    flex: 1;
                }

                .search-input::placeholder,
                .search-icon {
                    color: var(--text-muted);
                }

                .search-icon {
                    width: var(--margin-m);
                    height: var(--margin-m);
                }

                .settings-icon {
                    transition: transform 0.25s;
                }

                .settings-icon[data-selected="true"] {
                    transform: rotate(60deg);
                }

                .icon {
                    cursor: pointer;
                }
            </style>
        
            <nav>
                <section class="nav-left">
                    <p class="nav-text">Dictionary</p>
                </section>
                <section class="nav-center">
                    <div class="search">
                        <img src="../../assets/search_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="search" class="search-icon icon">
                        <input type="search" class="search-input" placeholder="Search">
                    </div>
                </section>
                <section class="nav-right">
                    <img src="../../assets/settings_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="settings" class="icon settings-icon">
                </section>
            </nav>
        `
    }

    connectedCallback() {
        const searchInput = this.shadowRoot.querySelector('.search-input')

        searchInput.addEventListener('keydown', (e) => {
            e.preventDefault()

            if (e.key !== 'Enter') return;

            // window.versions.ping().then(response => console.log(response))
        })
    }
}

customElements.define('nav-bar', NavBar)