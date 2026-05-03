// hero sliders js code
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".Hero", {
        loop: true, 
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});
/*-- active manu --*/
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#menu .nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120; // navbar offset
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("nav-active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("nav-active");
        }
    });

});
/* -- responsive --*/
function toggleMenu() {
    const menu = document.getElementById('menu');
    const icon = document.getElementById('menuIcon');

    menu.classList.toggle('hidden');

    // icon change (bars ↔ close)
    if (menu.classList.contains('hidden')) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    }
}

/* mobile menu auto close when clicking link */
document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('menu');
        const icon = document.getElementById('menuIcon');

        if (window.innerWidth < 1024) {
            menu.classList.add('hidden');

            // reset icon
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
});
// Form validation function
function FormSubmit(e){
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const ErrorName = document.getElementById('ErrorName');
    const ErrorEmail = document.getElementById('ErrorEmail');
    const ErrorMessage = document.getElementById('ErrorMessage');

    ErrorName.innerText = '';
    ErrorEmail.innerText = '';
    ErrorMessage.innerText = '';

    let  valid = true;

    if(name === '' || name.length < 3 || name.length > 32){
        ErrorName.innerText = "Name is required";
        valid = false;
    }
    if(email === '' || !email.includes('@')){
        ErrorEmail.innerText = "Valid Email required";
        valid = false;
    }
    if(message === '' || message.length < 3 || message.length > 150){
        ErrorMessage.innerText = "Message is required";
        valid = false;
    }else{
        alert('All is okey');
    }

}
/* -- scroll top --*/
document.addEventListener("scroll", handleScroll);

let scrollToTopBtn = document.querySelector(".scrollToTopBtn");

function handleScroll() {
    let scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let GOLDEN_RATIO = 0.5;

    if ((document.documentElement.scrollTop / scrollableHeight ) > GOLDEN_RATIO) {
        scrollToTopBtn.style.display = "flex";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
        window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
/* -- affix nav --*/
window.onscroll = function(){
    let scroll = window.scrollY;

    let nav = document.querySelector('#affix-nav');

    if(scroll > 200){
        nav.classList.add('fixed', 'w-full', 'top-0', 'shadow-lg');
    } else {
        nav.classList.remove('fixed', 'w-full', 'top-0', 'shadow-lg');
    }
}
/*--  Fetch posts from API and store in global array -- */
let allPosts = [];
let visibleCount = 6; 

async function Post(){
    let res = await axios.get("https://jsonplaceholder.typicode.com/posts");

    allPosts = res.data;
    renderPosts();
}

function renderPosts(){
    $("#ITPost").empty();

    allPosts.slice(0, visibleCount).forEach((item)=>{
        let EachItem = `
        <div class="col-span-12 sm:col-span-6 lg:col-span-4 group">
            <div class="bg-white rounded-lg shadow-sm p-6 text-center group-hover:bg-[#086ad7] duration-300">
                <h3 class="font-bold text-zinc-700 my-4 group-hover:text-white">${item.title}</h3>
                <p class="text-lg text-zinc-700 group-hover:text-white">${item.body}</p>
            </div>
        </div>`;

        $("#ITPost").append(EachItem);   
    });
}

function loadMore(){
    visibleCount += 3; 
    renderPosts();
}

Post();
