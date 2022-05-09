(() => {
    const carouselUi = document.querySelector('.carousel-list');
    const imageInput = document.querySelector('#image-upload-input');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // 이미지 위치 재조정 함수
    function changeTransform(){
        const items = document.querySelectorAll('.carousel-item');

        items.forEach((e, i) => {
            let degree = 360 / items.length;

            if(items.length > 1){
                if(i === 0){
                    e.style.transform = 'rotateY(0deg) translateZ(250px)';
                }
                else{
                    e.style.transform = `rotateY(${degree * i}deg) translateZ(250px) rotateY(-${degree * i}deg)`;
                }
            }

            if(items.length >= 5){
                if(i === 0){
                    e.style.transform = 'rotateY(0deg) translateZ(250px)';
                }
                else if(i === 1){
                    e.style.transform = 'rotateY(72deg) translateZ(250px) rotateY(-72deg)';
                }
                else if(i === 2){
                    e.style.transform = 'rotateY(144deg) translateZ(250px) rotateY(-144deg) translateX(400px)';
                }
                else if(i === items.length -2){
                    e.style.transform = 'rotateY(216deg) translateZ(250px) rotateY(-216deg)  translateX(-400px)';
                }
                else if(i === items.length -1){
                    e.style.transform = 'rotateY(288deg) translateZ(250px) rotateY(-288deg)';

                }
                else{
                    e.style.transform = `rotateY(${degree * i}deg) translateZ(250px) rotateY(-${degree * i}deg)`;
                }
            }
        });
    }

    // prev 버튼 클릭시 이벤트
    function movePrev(){
        const items = document.querySelectorAll('.carousel-item');

        if(items.length > 1){
            const currItem = document.querySelector('.now');
            const prevItem = carouselUi.lastElementChild;

            carouselUi.insertBefore(prevItem, items[0]);
            currItem.classList.remove('now');
            prevItem.classList.add('now');
        }       

        changeTransform();
    }

    // next 버튼 클릭시 이벤트
    function moveNext(){
        const items = document.querySelectorAll('.carousel-item');

        if(items.length > 1){
            const currItem = document.querySelector('.now');
            const nextItem = currItem.nextElementSibling;

            carouselUi.appendChild(currItem);
            carouselUi.classList.remove('now');
            nextItem.classList.add('now');
        }

        changeTransform();
    }

    // 새로운 li 태그 이하 자식 생성 함수
    function createTag(imgUrl){
        const li = document.createElement('li');
        const img = document.createElement('img');
        li.classList.add('carousel-item');
        img.src = imgUrl;
        li.appendChild(img);

        const items = document.querySelectorAll('.carousel-item');
        items.forEach(item => {
            item.classList.remove('now');
        });
        li.classList.add('now');

        return li;
    }

    // 이미지 업로드 클릭시 이벤트
    function uploadImg(val){
        const items = document.querySelectorAll('.carousel-item');

        if(val.files){
            const reader = new FileReader();
            reader.onload = e => {
                const imgUrl = e.currentTarget.result;
                carouselUi.insertBefore(createTag(imgUrl), items[0]);
                changeTransform();
            }

            reader.readAsDataURL(val.files[0]);
        }
    }
    imageInput.addEventListener('change', e =>{
        uploadImg(e.currentTarget);
    });
    prevBtn.addEventListener('click', movePrev);
    nextBtn.addEventListener('click', moveNext);

    window.onload = () => {
        changeTransform();
    }
})();