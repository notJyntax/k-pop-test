const homeBox = document.querySelector(".home");
const quizBox = document.querySelector(".quiz");
const resultBox = document.querySelector(".result");
const timeLiner = quizBox.querySelector(".timer__bar");
const quizText = quizBox.querySelector(".quiz__text");
const quizImg = quizBox.querySelector(".quiz__img");
const optionList = quizBox.querySelector(".option__container");
const startBtn = homeBox.querySelector(".btn");
const goHomeBtn = resultBox.querySelector(".restart-btn");
const resultText = resultBox.querySelector(".result__body .screen__text");

startBtn.addEventListener("click", startQuiz);
optionList.addEventListener("click", checkAnswer);
goHomeBtn.addEventListener("click", goHome);

let score = 0;
let counter = 0;

let timeLine;
let widthValue = 0;

function startQuiz(){
  homeBox.classList.remove("active");
  quizBox.classList.add("active");
  showQuestions(0);
  startTimeLine(0);
}

function startTimeLine(sec){
  timeLine = setInterval(timer, 29);
  function timer(){
    sec+=1;
    timeLiner.style.width = sec + 'px';
    if(sec > 250){
      clearInterval(timeLine);
      getNewQuestion();
    }
  }
}

function showQuestions(index){
  let q_text = `<span>${quiz[index].q}</span>`;
  quizText.innerHTML = q_text;

  let q_image = `<div><image src=${quiz[index].image}></div>`;
  quizImg.innerHTML = q_image;

  let q_options = `<span>${quiz[index].options[0]}</span>`
  + `<span>${quiz[index].options[1]}</span>`
  + `<span>${quiz[index].options[2]}</span>`
  + `<span>${quiz[index].options[3]}</span>`;
  optionList.innerHTML = q_options;

  counter++;
}

function checkAnswer(e){
  const answerClicked = e.target.innerText;
  if(answerClicked === quiz[counter-1].answer){
    score++;
  }
  getNewQuestion();
}

function getNewQuestion(){
  if(counter === quiz.length) {
    finishQuiz();
  }else{
    clearInterval(timeLine);
    startTimeLine(widthValue);
    showQuestions(counter);
  }
}

function finishQuiz(){
  clearInterval(timeLine);

  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  if(score < 10){
    resultText.innerHTML = "<h3>당신은 머글</h3><p>가수와 제목은 기억안나도 들으면 기억이 날거에요. 우리가 사랑했던 그시절 케이팝... 당신도 코리안이니까요! 언제나 티비에 나오던 최신곡들은 항상 꿰차고 있는 당신의 mp3 티비와 주변에서 유행하는 곡들과 전날 화제였던 방송은 언제나 봤던것 같은데..하지 않으셨나요</p>";
  }else if(score > 9 && score < 14){
    resultText.innerHTML = "<h3>당신은 덕후</h3><p>첫소절만 들어도 노래제목과 사랑했던 가수가 자동 재생. 케이팝으로 심신을 달래던 당신은 케이팝덕후이군요! 모두가 팝송을 들을때, 조용히 지조있는 케이팝을 듣는 당신 한번씩 그시절 노래의 주인공이 되곤하며, mp3에는 언제나 명곡들을 넣어다니지 않았나요?</p>";
  }else if(score > 13 && score < 18){
    resultText.innerHTML = "<h3>당신은 고인물</h3><p>첫 소절이 아닌 반주만 들어도 몸이 먼저 반응하여 들썩이고 감성에 젖는 덕후를 넘어선 케이팝 고인물이시군요 숨듣명 케이팝 플레이리스트 채널들을 구독하고 있으며, 혼자서는 물론  노래방에서도 가사와 무대 애드리브 포인트를 다 외우는 찐입니다.</p>";
  }else if(score > 17){
    resultText.innerHTML = "<h3>당신은 망령</h3><p>시대가 바뀌어도 그 시절의 케이팝을 잊지못해 귀천을 떠도는  당신은 고인물을 넘어선 진정한 케이팝의 망령이시군요! 그시절의 노래들로만 따로 플레이스트가 있는것은 기본 가수들의 무대, 앨범들의 수록곡 섭렵 그들이 나왔던 방송들까지도 훤히 기억하고 즐기고 있네요</p>";
  }
}

function goHome(){
  window.location.reload();
}


const copyLinkBtns = document.querySelectorAll(".link-copy-btn");
copyLinkBtns.forEach(copyLinkBtn => copyLinkBtn.addEventListener("click", copyToClipboard));

function copyToClipboard(){
  const link_textarea = document.createElement('textarea');
  const siteUrl = document.createTextNode(window.location.href);
  link_textarea.appendChild(siteUrl);
  document.body.appendChild(link_textarea);
  alert("URL 복사가 완료되었습니다."); 
  link_textarea.select();
  document.execCommand('copy');
  document.body.removeChild(link_textarea);
};