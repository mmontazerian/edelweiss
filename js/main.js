class TabNavigation {

    constructor() {
        document.addEventListener("DOMContentLoaded", () => {
            this.initTabs();
            this.initCollapsibles();
            this.initNavbar();
            this.initNavLinks();
            this.initSmoothScrolling();
        });
        window.addEventListener('resize', this.handleWindowResize.bind(this));
        window.addEventListener('scroll', this.handleWindowScroll.bind(this));
    }

    initTabs() {
        const tabs = document.querySelectorAll(".nav-tabs-light li");
        const tabPanes = document.querySelectorAll(".tab-content .tab-pane");

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", (event) => {
                event.preventDefault();

                tabs.forEach((tab) => tab.classList.remove("active"));
                tabPanes.forEach((pane) => pane.classList.remove("active"));

                tab.classList.add("active");
                tabPanes[index].classList.add("active");
            });
        });
    }

    toggleAOS() {
        const aosStylesheet = document.getElementById('aos-stylesheet');
        if (window.innerWidth < 1024) {
            if (aosStylesheet) aosStylesheet.disabled = true;
        } else {
            if (aosStylesheet) aosStylesheet.disabled = false;
        }
    }

    initCollapsibles() {
        const collapsibles = document.querySelectorAll('.collapsible');
        collapsibles.forEach((item) => item.addEventListener('click', function () {
            this.classList.toggle('collapsible--expanded');
        }));
    }

    initNavbar() {
        const navbar = document.getElementById('navbar');
        const menuIcon = document.getElementById('menu-icon');
        const navItems = document.getElementById('nav-items');
        const iconMenu = menuIcon.querySelector('.icon-menu');
        const iconX = menuIcon.querySelector('.icon-x');

        menuIcon.addEventListener('click', () => {
            if (navItems.style.display === 'none' || navItems.style.display === '') {
                navItems.style.display = 'flex';
                iconMenu.style.display = 'none';
                iconX.style.display = 'block';
            } else {
                navItems.style.display = 'none';
                iconMenu.style.display = 'block';
                iconX.style.display = 'none';
            }
        });
    }

    handleWindowScroll() {
        const navbar = document.getElementById('navbar');

        if (window.scrollY > 10) {
            navbar.style.background = '#fff';
            navbar.style.borderBottom = '0.5px solid #f5f5f5';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.borderBottom = 'none';
        }

        // Active link on scroll
        const navLinks = document.querySelectorAll('.nav-items a');
        let fromTop = window.scrollY + navbar.offsetHeight + 1;

        navLinks.forEach(link => {
            let section = document.querySelector(link.hash);

            if (section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    handleWindowResize() {
        const navItems = document.getElementById('nav-items');
        const iconMenu = document.getElementById('menu-icon').querySelector('.icon-menu');
        const iconX = document.getElementById('menu-icon').querySelector('.icon-x');

        if (window.innerWidth > 768) {
            navItems.style.display = 'flex';
            iconMenu.style.display = 'block';
            iconX.style.display = 'none';
            this.toggleAOS();
        } else {
            navItems.style.display = 'none';
            iconMenu.style.display = 'block';
            iconX.style.display = 'none';
            this.toggleAOS();
        }
    }

    initNavLinks() {
        const navLinks = document.querySelectorAll('.nav-items a');

        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                if (window.innerWidth <= 768) {
                    document.getElementById('nav-items').style.display = 'none';
                    document.querySelector('.icon-menu').style.display = 'block';
                    document.querySelector('.icon-x').style.display = 'none';
                }
            });
        });
    }

    initSmoothScrolling() {
        const navbar = document.getElementById('navbar');

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                let target = document.querySelector(this.getAttribute('href'));
                let offset = navbar.offsetHeight;
                let targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                let offsetPosition = targetPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            });
        });
    }
}

const tabNavigation = new TabNavigation();
