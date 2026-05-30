class NavBar extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' })

        shadow.innerHTML = `
            <style>
                nav {
                    width:100%;
                    box-sizing: border-box;
                    font-family: var(--ff);
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    background: var(--gradient-hover);
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
                    color: var(--text);
                    cursor: pointer;
                    transition: color 0.25s, text-decoration 0.25s;
                }

                nav p:hover {
                    color: var(--primary);
                    text-decoration: underline;
                }

                .search {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    padding: var(--margin-xs);
                    border-radius: var(--margin-xl);
                    background: var(--bg);
                    border: 1px solid var(--border);
                }

                .search-input {
                    background: transparent;
                    border: none;
                    color: var(--text);
                    margin-left: var(--margin-xs);
                    font-family: var(--ff);
                    font-size: var(--margin-s);
                    outline: none;
                    flex: 1;
                }

                .search-input::-webkit-search-cancel-button {
                    cursor: pointer;
                }

                .search-input::placeholder,
                .search-icon {
                    color: var(--text-muted);
                }

                .search-icon {
                    width: var(--margin-m);
                    height: var(--margin-m);
                }

                .icon {
                    cursor: pointer;
                }
            </style>
        
            <nav>
                <section class="nav-left">
                    <p class="nav-text dictionary-home">Dictionary</p>
                </section>
                <section class="nav-center">
                    <div class="search">
                        <img src="../../assets/search_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="search" class="search-icon icon">
                        <input type="search" class="search-input" placeholder="Search">
                    </div>
                </section>
                <section class="nav-right">
                    <img src="../../assets/addLarge.svg" alt="add" class="icon add-icon add-entry">
                </section>
            </nav>
        `
    }

    connectedCallback() {
        const searchInput = this.shadowRoot.querySelector('.search-input')
        const addEntry = this.shadowRoot.querySelector('.add-entry')
        const dictionaryText = this.shadowRoot.querySelector('.dictionary-home')

        searchInput.addEventListener('keydown', (e) => {

            if (e.key !== 'Enter') return;

            // window.versions.ping().then(response => console.log(response))
        })

        addEntry.addEventListener('click', () => {
            window.location = '../newEntry/newEntry.html'
        })

        dictionaryText.addEventListener('click', () => {
            window.location = '../home/home.html'
        })
    }
}

customElements.define('nav-bar', NavBar)