function showRandomImage(event) {
  const images = ['click1', 'click2', 'click3','click4','click5','click6']; // 사용할 이미지들
  const randomIndex = Math.floor(Math.random() * images.length); // 랜덤 인덱스
  const selectedImageId = images[randomIndex]; // 랜덤으로 선택된 이미지의 ID
  const selectedImage = document.getElementById(selectedImageId); // 이미지 선택

  // 배경을 클릭한 좌표로 이미지를 배치
  const x = event.clientX;
  const y = event.clientY;
  selectedImage.style.left = `${x - 100}px`; // 이미지의 중앙이 클릭한 지점에 오도록 위치 조정
  selectedImage.style.top = `${y - 100}px`;

  // 이미지 보이기
  selectedImage.classList.add('show');

  // 이미지가 2초 후에 사라지도록 설정
  setTimeout(() => {
      selectedImage.classList.remove('show');
  }, 5000); // 2초 후에 사라지도록
}

const topDiv = document.querySelector(".top");

for (let i = 0; i < 200; i++) {
  const snow = document.createElement("div");
  snow.className = "snow";
  snow.style.opacity = Math.random();

  const startX = Math.random() * 100;
  const endX = startX + (Math.random() * 20 - 10);
  const scale = Math.max(Math.random(), 0.5);

  const keyframe = [
    { transform: `translate(${startX}vw, 0) scale(${scale})` },
    { transform: `translate(${endX}vw, 100vh) scale(${scale})` },
  ];
  const option = {
    duration: 15000 + Math.random() * 5000,
    easing: "linear",
    iterations: Infinity,
    delay: -Math.random() * 20000,
  };

  snow.animate(keyframe, option);
  topDiv.appendChild(snow);
}


function nextIntro(introNumber) {
  // 모든 섹션 숨기기
  document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
  
  // 현재 섹션 표시
  const currentSection = document.getElementById('intro' + introNumber);
  if (currentSection) {
    currentSection.style.display = 'block';
  }

  if (introNumber === 2) {
    typeText1();

    // 첫 번째 효과음 재생
    const audio1 = document.getElementById("effect1");
    const audio2 = document.getElementById("effect1-1");

    if (audio1 && audio2) {
      audio1.play().catch(error => console.error("effect1 재생 실패:", error));

      // 첫 번째 효과음이 끝난 뒤 두 번째 효과음 재생
      audio1.addEventListener("ended", () => {
        // 두 번째 효과음 시작 지점 설정 (77초)
        audio2.currentTime = 77; 
        audio2.play();
        
        setTimeout(() => {
          audio2.pause();
          audio2.currentTime = 0; // 재생 위치 초기화
          nextIntro(3); // intro3으로 전환
        }, 20000); // 20초 지속
      });
    }
  } else if (introNumber === 3) {
    typeText2(); // intro3에서 실행할 함수
  } else if (introNumber === 4) {
    typeText3(); // intro4에서 실행할 함수
  } else if (introNumber === 5) {
    typeText4(); // intro5에서 실행할 함수
  }
}

// 노래 플레이
const toggleButton = document.getElementById('bgmButton');
const audioPlayer = document.getElementById('audioPlayer');
let isPlaying = false;
toggleButton.addEventListener('click', () => {
if (isPlaying) {
  // 음악 정지 및 이미지 변경
  audioPlayer.pause();
  toggleButton.src = "icon/bgm2.png";  // 정지-이미지 변경
  isPlaying = false;
} else {     // 음악 재생 및 이미지 변경
  if (audioPlayer.paused && audioPlayer.currentTime === 0) {      // 처음 재생하는 경우
    audioPlayer.play();
  } else {    // 이어서
    audioPlayer.play();
  }
  toggleButton.src = "icon/bgm1.png";  // 재생-이미지 변경
  isPlaying = true;
}
});

const texts = ["슈붕", "호떡", "팥붕", "어묵", "간식", "군밤", "호빵"];
const animatedText = document.getElementById("anitext");

function changeText() {
  const randomIndex = Math.floor(Math.random() * texts.length); // 랜덤 인덱스 생성
  const newText = texts[randomIndex]; // 랜덤 텍스트 선택

  setTimeout(() => {
    // 텍스트 변경 및 랜덤 색상 적용
    animatedText.textContent = newText;
    animatedText.classList.remove("hidden");
  }, 100); // 애니메이션 지속 시간 (0.5초 후 텍스트 변경)
}
// 일정 시간 간격으로 텍스트 변경
setInterval(changeText, 500); // 2초마다 변경

// 첫 번째 타이핑 효과
function typeText1() {
const textElement = document.querySelector(".text1");
const textContent = "추운 겨울, 길을 걷던..."; // 타이핑
let index = 0;

// 타이핑 효과를 구현하는 함수
function type() {
  if (index < textContent.length) {
    textElement.textContent += textContent[index]; // 한 글자씩 추가
    index++;
    setTimeout(type, 100); // 타이핑 속도 (100ms)
  } else {
    showAlertBox(); // 타이핑이 끝난 후 alertbox2-1 표시
  }
}

// 기존 텍스트 초기화 후 타이핑 시작
textElement.textContent = ""; // 초기화
type();
}

// alertbox2-1 표시 함수
function showAlertBox() {
const alertBox = document.querySelector('.alertbox2-1');
alertBox.style.transition = "opacity 1s ease-in-out"; // 부드러운 전환
alertBox.style.opacity = "1"; // 보이게 설정
}

// 입력한 이름을 로컬 스토리지에 저장하는 함수
function saveName() {
    const nameInput = document.getElementById("nameInput").value;
    if (nameInput) {
        // 입력한 이름을 로컬 스토리지에 저장
        localStorage.setItem("userName", nameInput);

        // intro2 숨기기, intro3로 넘어가기
        document.getElementById("intro2").style.display = "none";
        nextIntro(3); // intro3로 넘어가기

        // 오디오 재생
        const audio = document.getElementById("effect2");
        if (audio) {
            audio.play()
        }
    } else {
        alert("별명을 써도 좋아요");
    }
}


// 두 번째 타이핑 효과
function typeText2() {
const savedName = localStorage.getItem("userName");
const textElement = document.querySelector(".text2");
const textContent2 = `추운 겨울, 길을 걷는 ${savedName}은 오늘도 배고프다`+'.        ▶'; // 타이핑할 텍스트
let index = 0;

// 타이핑 효과를 구현하는 함수
function type() {
  if (index < textContent2.length) {
    textElement.textContent += textContent2[index]; // 한 글자씩 추가
    index++;
    setTimeout(type, 100); // 타이핑 속도 (100ms)
  } else {
    // 타이핑이 끝난 후 클릭 이벤트 추가
    textElement.addEventListener('click', () => {
      nextIntro(4);  // 텍스트 클릭 시 nextIntro(4) 호출
    });
  }
}

// 기존 텍스트 초기화 후 타이핑 시작
textElement.textContent = ""; // 초기화
type();
}

function typeText3() {
  const textElement = document.querySelector(".text3");
  const firstText = "난 아무래도 ";
  const secondText = "이 가장 먹고싶어.";
  let selectedItem = ""; // 선택된 아이템 텍스트 저장
  let index = 0;

  // 첫 번째 타이핑 효과
  function typeFirstText() {
    if (index < firstText.length) {
      textElement.textContent += firstText[index]; // 한 글자씩 추가
      index++;
      setTimeout(typeFirstText, 100); // 타이핑 속도 (100ms)
    } else {
      textElement.textContent += "이게 제일 먹고싶어"; // 초기 ㅇㅇ 추가
      attachHoverEvents(); // 호버 이벤트 추가
    }
  }

  
  // 이미지에 마우스 호버 이벤트 추가
  function attachHoverEvents() {
    const images = document.querySelectorAll(".hover-image");
    images.forEach(image => {
      image.addEventListener("mouseenter", () => {
        selectedItem = image.dataset.name; // 호버 중인 이미지 이름 가져오기
        updateTextWithItem(); // 텍스트 업데이트
      });
    });
  }

  // 텍스트에 ㅇㅇ 대신 선택된 아이템 추가
  function updateTextWithItem() {
    textElement.textContent = `${firstText}${selectedItem}${secondText}`;
  }

  // 기존 텍스트 초기화 후 첫 번째 타이핑 시작
  textElement.textContent = ""; // 초기화
  typeFirstText();
}


document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector(".text4");
  let selectedItem = ""; // 선택된 아이템 이름을 저장하는 변수
  const firstText = "저기로 가면 ";
  const secondText = "을 만날 수 있을지도?";
  
  // 이미지에 호버 이벤트와 클릭 이벤트 추가
  function attachHoverEvents() {
    const images = document.querySelectorAll(".hover-image");
    images.forEach(image => {
      // 마우스를 올렸을 때 이미지 이름 업데이트
      image.addEventListener("mouseenter", () => {
        selectedItem = image.dataset.name;
        console.log(`Hovered: ${selectedItem}`); // 디버깅용
      });

      // 클릭 시 텍스트 업데이트
      image.addEventListener("click", () => {
        updateTextWithItem(); // 선택된 간식을 텍스트에 반영
      });
    });
  }

  // 텍스트에 [선택한 간식]을 반영
  function updateTextWithItem() {
    if (selectedItem) {
      textElement.textContent = ""; // 초기화
      typeTextWithItem(); // 타이핑 시작
    } else {
      console.error("선택된 아이템이 없습니다."); // 디버깅용
    }
  }

  // 타이핑 효과로 텍스트를 출력
  function typeTextWithItem() {
    const fullText = `${firstText}${selectedItem}${secondText}`;
    let index = 0;

    function type() {
      if (index < fullText.length) {
        textElement.textContent += fullText[index];
        index++;
        setTimeout(type, 100); // 타이핑 속도
      } else {
        console.log("타이핑 완료");
      }
    }

    textElement.textContent = ""; // 초기화
    type();
  }

  // 초기화 및 이벤트 연결
  attachHoverEvents();
});
