$(document).ready(function(){

    //전역 변수 설정
    var $btns = $("#scrollBtn li");
    var $boxs = $(".myScroll");
    var speed = 1000;
    var len = $btns.length;
    var posArr;    
    var baseLine = -250;

    //처음 로딩시 해당 박스의 세로 위치값을 구해는 함수 호출
    setPos();

    //브라우저 리사이즈시 다시 세로 위치값 갱신
    $(window).on("resize", setPos );
    
    //세로 버튼 클릭시 자동으로 해당 위치로 이동해주는 함수 호출
    $btns.find("a").on("click", function(e){
        e.preventDefault();
        moveScroll(this);        
    });

    //브라우저 스크롤시 해당 스크롤값과 박스의 위치값을 비교해서
    //자동으로 버튼 활성화 해주는 함수 호출
    $(window).on("scroll", function(){
        var scroll = $(this).scrollTop();     
        activateBtn(scroll);
    });

    //박스 갯수만큼 반복을 돌면서 전역변수  posArr에 세로 위치값을 저장하는 함수
    function setPos(){
        posArr = [];
        for (var i=0; i<len; i++){
            posArr.push( $boxs.eq(i).offset().top );
        }
        console.log(posArr);
    }

    //현재 스크롤 위치값을 인수로 받아서
    //스크롤 값과 박스의 위치를 비교해서 해당하는 버튼만 활성화 시키는 함수
    function activateBtn(scroll){
        for(var i=0; i<len; i++){
            if( scroll >= posArr[i] + baseLine){
                $btns.find("a").removeClass("on");
                $btns.eq(i).find("a").addClass("on");

                $boxs.removeClass("on")
                $boxs.eq(i).addClass("on");
            }
        }        
    }

    //선택한 요소의 아이디값을 받아서 해당 아디값에 해당하는 박스를 찾고
    //해당 박스의 세로 위치값으로 자동 이동시켜주는 함수
    function moveScroll(el){
        var target = $(el).attr("href");
        var targetPos = $(target).offset().top; 
        $("html, body").stop().animate({ scrollTop : targetPos },speed);
    }


 
});