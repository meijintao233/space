var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d');
	canvas.width = document.getElementsByTagName('body')[0].offsetWidth;
	canvas.height = document.getElementsByTagName('body')[0].offsetHeight;
	

(function(){

//随机颜色
function randomColor(){
	var colors = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
	var strs = '#',index;
	for(var i=0;i<6;i++){
		index = Math.round(Math.random()*15);
		strs += colors[index];
	}
	return strs;
}

//获取鼠标位置
function getCanvasPos(canvas,e)  {   
    var rect = canvas.getBoundingClientRect();
    return {   
     x: (e.clientX - rect.left) * (canvas.width / rect.width),  
     y: (e.clientY - rect.top) * (canvas.height / rect.height)  
   };  
} 	
	
	

//生成圆	
var num = 80,cir=[num+2];	
	for(var i=1;i<num+2;i++) {
			var x = Math.random()*canvas.width,
				y = Math.random()*canvas.height,
				r = 3*(Math.random()+0.5)|0,				
				r1 =50*(Math.random()+0.5)|0,				
				speed1 = (Math.random()-0.5)*1,
				speed2 = (Math.random()-0.5)*1;				
				context.fillStyle = 'rgba(255,255,255,0)';
				cir.push({
					'x':x,
					'y':y,
					'r':r,
					'r1':r1,
					'speed1':speed1,
					'speed2':speed2,					
				});
	context.moveTo(x,y);
	context.beginPath();
	context.arc(x,y,r,0,Math.PI * 2,true);
	context.closePath();
	context.fill();
	}
		
		
//鼠标移动
$('#canvas').on('mousemove',function(e){
	var pos=getCanvasPos(canvas,e);
	cir.pop();
	cir.push({
		'x':pos.x,
		'y':pos.y,
		'r':1,
		'r1':80,
		'speed1':0,
		'speed2':0			
	})		
});

//鼠标点击生成圆
$('#canvas').on('click',function(e){
	var pos = getCanvasPos(canvas,e);	
	num+=3;
	cir.pop();
	var	r2 = 3*(Math.random()+0.5)|0;
	for(var z=0;z<4;z++){
	var r3=60*(Math.random()+0.5)|0;	
		cir.push({
		'x':pos.x,
		'y':pos.y,
		'r':r2,
		'r1':r3,
		'speed1':(Math.random()-0.5)*1,
		'speed2':(Math.random()-0.5)*1,	
		})	
	}
});

//生成连线
function line(){	
	for(var j=1;j<num+2;j++){
		cir[0]=cir[j];
			for(var i=j;i<num+2;i++){	
					var	left = (cir[0].x-cir[i].x)*(cir[0].x-cir[i].x)+(cir[0].y-cir[i].y)*(cir[0].y-cir[i].y),
						right = cir[0].r1*cir[0].r1;
					if(i == num+1){
						lw =2-Math.sqrt(left)*0.01;
					}else{
						lw =1.2-Math.sqrt(left)*0.01;
					}
						
						context.strokeStyle = 'rgba(255,255,255,'+ lw +')';
						context.lineWidth = 0.8;
						if(left | 0 < right| 0){						
							context.beginPath();
							context.moveTo(cir[0].x,cir[0].y);
							context.lineTo(cir[i].x,cir[i].y);
							context.closePath();
							context.stroke();
						}						
			}
	
	}
	
}

//圆移动
(function move(){

		context.clearRect(0,0,canvas.width,canvas.height);
		for( var j = 1 ; j < num+1 ; j++){
			var a = cir[j];
						
			context.moveTo(a.x+=a.speed1,a.y +=a.speed2);
			context.beginPath();
			context.arc(a.x , a.y , a.r ,0, Math.PI*2 , true);
			context.closePath();
			
			if(a.x > canvas.width|| a.y > canvas.height || a.x < 0|| a.y < 0){
						a.x = Math.random()*canvas.width;
						a.y = Math.random()*canvas.height;
			}
			context.fill();
		
		}

	line();
	
	window.requestAnimationFrame(move);
})();

})()
