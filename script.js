document.addEventListener('DOMContentLoaded', () => {
    const $ = id => document.getElementById(id);
    const cursor = document.querySelector('.custom-cursor');
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const startScreen = $('start-screen');
    const startText = $('start-text');
    const profileName = $('profile-name');
    const profileBio = $('profile-bio');
    const profileBlock = $('profile-block');
    const profilePicture = document.querySelector('.profile-picture');
    const profileContainer = document.querySelector('.profile-container');
    const bgMusic = $('bg-music');

    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    } else {
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', () => cursor.style.transform = 'scale(0.8) translate(-50%, -50%)');
        document.addEventListener('mouseup', () => cursor.style.transform = 'scale(1) translate(-50%, -50%)');
    }

    startText.textContent = "Click me >.<";
    profileName.textContent = "Teen";
    profileBio.textContent = "chronically online";

    function handleTilt(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const mouseX = clientX - centerX;
        const mouseY = clientY - centerY;
        const maxTilt = 8;
        const tiltX = -(mouseY / rect.height) * maxTilt; 
        const tiltY = (mouseX / rect.width) * maxTilt;
        
        gsap.to(element, { 
            rotationX: tiltX, 
            rotationY: tiltY, 
            duration: 0.3, 
            ease: 'power2.out', 
            transformPerspective: 1000 
        });
    }

    function resetTilt(element) {
        gsap.to(element, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' });
    }

    profileBlock.addEventListener('mousemove', e => handleTilt(e, profileBlock));
    profileBlock.addEventListener('mouseleave', () => resetTilt(profileBlock));

    profilePicture.addEventListener('click', () => {
        profileContainer.classList.remove('fast-orbit');
        profileContainer.classList.remove('orbit');
        void profileContainer.offsetWidth;
        profileContainer.classList.add('fast-orbit');
        setTimeout(() => {
            profileContainer.classList.remove('fast-orbit');
            void profileContainer.offsetWidth;
            profileContainer.classList.add('orbit');
        }, 500);
    });

    function enterSite() {
        if (startScreen.classList.contains('hidden')) return;
        startScreen.classList.add('hidden');
        
        const musics = [
            'assets/music1.mp4',
            'assets/music2.mp4',
            'assets/music3.mp4'
        ];
        
        const randomMusic = musics[Math.floor(Math.random() * musics.length)];
        
        bgMusic.src = randomMusic;
        bgMusic.volume = 0.5;
        bgMusic.play().catch(err => console.log("Erreur audio:", err));

        gsap.fromTo(profileBlock,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out',
              onComplete: () => profileContainer.classList.add('orbit')
            }
        );
    }

    startScreen.addEventListener('click', enterSite);
    startScreen.addEventListener('touchstart', e => { e.preventDefault(); enterSite(); });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
        });
    }

    const sideCard = document.getElementById('side-card');
    if (sideCard && window.innerWidth > 768) {
        let startTop = sideCard.getBoundingClientRect().top + window.scrollY - 40;
        window.addEventListener('scroll', () => {
            if (window.scrollY > startTop) {
                let offset = window.scrollY - startTop;
                sideCard.style.transform = `translateY(${offset}px)`;
            } else {
                sideCard.style.transform = `translateY(0)`;
            }
        });
    }
}); 