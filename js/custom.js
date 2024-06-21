/* HTML document is loaded. DOM is ready.
-------------------------------------------*/
$(function(){

    /* start typed element */
    //http://stackoverflow.com/questions/24874797/select-div-title-text-and-make-array-with-jquery
    var subElementArray = $.map($('.sub-element'), function(el) { return $(el).text(); });    
    $(".element").typed({
        strings: subElementArray,
        typeSpeed: 30,
        contentType: 'html',
        showCursor: false,
        loop: true,
        loopCount: true,
    });
    /* end typed element */
    
    /* Smooth scroll and Scroll spy (https://github.com/ChrisWojcik/single-page-nav)    
    ---------------------------------------------------------------------------------*/ 
    $('.templatemo-nav').singlePageNav({
        offset: $(".templatemo-nav").height(),
        filter: ':not(.external)',
        updateHash: false
    });

    /* start navigation top js */
    $(window).scroll(function(){
        if($(this).scrollTop()>58){
            $(".templatemo-nav").addClass("sticky");
        }
        else{
            $(".templatemo-nav").removeClass("sticky");
        }
    });
    
    /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    /* end navigation top js */

    $('body').bind('touchstart', function() {});

    /* wow
    -----------------*/
    new WOW().init();
});

/* start preloader */
$(window).load(function(){
	$('.preloader').fadeOut(1000); // set duration in brackets    
});
/* end preloader */

/* slider */
let slideIndex = 0;
let autoSlideInterval;

document.addEventListener("DOMContentLoaded", function() {
    showSlides(slideIndex); // Show initial slide
    startAutoSlide(); // Start automatic slideshow
});

function plusSlides(n) {
    showSlides(slideIndex += n); // Move to next/previous slide
}

function currentSlide(n) {
    showSlides(slideIndex = n - 1); // Move to specific slide
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    // Wrap around slide index
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    
    // Hide all slides and remove active dot indicator
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
        slides[i].classList.remove("fade"); // Remove fade animation class
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    // Display current slide and mark dot as active
    slides[slideIndex].style.display = "block";  
    slides[slideIndex].classList.add("fade"); // Add fade animation class
    dots[slideIndex].classList.add("active");
}

function startAutoSlide() {
    autoSlideInterval = setInterval(function() {
        plusSlides(1); // Move to next slide automatically
    }, 1600); // Change slide every 1.6 seconds (1600 ms)
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval); // Stop automatic sliding
}

// Event listeners for controlling automatic slide and hover pause
document.querySelector('.slideshow-container').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.slideshow-container').addEventListener('mouseleave', startAutoSlide);

// Ensure slideshow starts immediately after content loads
showSlides(slideIndex);
startAutoSlide();


