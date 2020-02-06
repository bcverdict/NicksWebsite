var c = document.getElementById("myCanvas");

let spacing = 20;
let lettering = 20;
var ctx = c.getContext("2d");
let speed_up_dict = {}
function clicked(){
	ctx.lineWidth = 8;
	ctx.fillStyle = "#24252A"
	ctx.fillRect(0,0,600,300)
	ctx.stroke()
	ctx.font = "15px Arial"
	ctx.fillStyle = "white"
	ctx.fillText("A: ", 0, spacing+4);
	ctx.fillText("B: ", 0, 2*spacing+4);
	ctx.fillText("C: ", 0, 3*spacing+4);
	ctx.fillText("D: ", 0, 4*spacing+4);
	ctx.font = "45px Arial"

	aColor = "red";
	bColor = "red";
	cColor = "red";
	dColor = "red";
	speed_up_dict = {};
	let arr = ['a','c','a','c','d','a','c','a','d','c','d','a','b','a','c','a','b','a','c','d','a','c','a','d','c','d','a','b','a','c','a','c','d','a','c','a','d','c','d','a','b','a','c','a','b','a','c','d','a','c','a','d','c','d','a','b','a']

	main_speed_up(arr, arr.length,0)
}
function main_speed_up(arr, length,index){
	setTimeout(function(){
		let endArrSize=length-index-1
		if(speed_up_dict[arr[index]] == undefined) {
			if(index!=0) {
				if(endArrSize){ //true when is not last element
					drawLines(arr[index],index,length);
					speed_up_dict[arr[index]]=[[index,endArrSize],index]
				}else{ //is last element
					drawLines(arr[index],index,length);
					speed_up_dict[arr[index]]=[[index],index]
				}
			}else{ //if is first element
				drawLines(arr[index],index,length);
				speed_up_dict[arr[index]]=[[endArrSize],index]
			}
		}
		else if(speed_up_dict[arr[index]][1]<index-1){
			let tempArr = speed_up_dict[arr[index]][0]
			if(tempArr == undefined) //fires when dict[i][0] is empty
				tempArr=[endArrSize]
			else if(tempArr.length==1) //fires when dict[i][0] is 1
				tempArr=[index-speed_up_dict[arr[index]][1]-1,endArrSize]
			else if(index!=length-1) //is not last element
				tempArr = tempArr.slice(0,tempArr.length-1)+[index-speed_up_dict[arr[index]][1]-1,endArrSize]
			else //is last element
				tempArr = tempArr.slice(0,tempArr.length-1)+[index-speed_up_dict[arr[index]][1]-1]
			drawLines(arr[index],index,length);
			speed_up_dict[arr[index]]=[tempArr,index]
		}
		else{ //next to each other
			let tempArr=speed_up_dict[arr[index]][0]
			if((tempArr==undefined)||(tempArr.length==1)) //fires when dict[arr[0]][0] is empty
				tempArr=[endArrSize]
			else if(endArrSize)
				tempArr[tempArr.length-1]-=1
			else
				tempArr=tempArr.slice(0,tempArr.length-1)
			
			let tempInd = speed_up_dict[arr[index]][1]+1
			drawLines(arr[index],index,length);
			speed_up_dict[arr[index]]=[tempArr,tempInd]
		}
		ctx.fillStyle = "#24252A"
		ctx.fillRect(275,120,50,50)
		ctx.stroke()
		ctx.fillStyle = "white"
		ctx.fillText(arr[index].toUpperCase(), 285, 8*spacing+4);
		
		ctx.beginPath();
		ctx.strokeStyle = "green"
		ctx.moveTo(300-(3*length)/2,0.6*300)
		ctx.lineTo((300-(3*length)/2)+3*index,0.6*300)
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.strokeStyle = "purple"
		ctx.moveTo((300-(3*length)/2)+3*index,0.6*300)
		ctx.lineTo(300+(3*length)/2,0.6*300)
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.strokeStyle = "red"
		ctx.moveTo((300-(3*length)/2)+3*index,0.6*300)
		ctx.lineTo((300-(3*length)/2)+3*index+2,0.6*300)
		ctx.stroke();
		ctx.closePath();
		
		if(index<length-1)
			main_speed_up(arr,length,index+1)
	},150)
}
function drawLines(letter, end1, end2){
	let index = 0;
	if(speed_up_dict[letter] != undefined)
		index = speed_up_dict[letter][1]
	let y = 1
	switch(letter){
		case 'b':
			y=2;		
			break;
		case 'c':
			y=3;
			break;
		case 'd':
			y=4;
			break;
	}
	ctx.strokeStyle = switchColor(letter,index==end1-1);
	ctx.beginPath();
	ctx.moveTo(3*index+lettering, y*spacing);
	ctx.lineTo(3*end1+lettering, y*spacing);
	ctx.stroke();
	ctx.closePath();
	
	ctx.strokeStyle = switchColor(letter,end1!=end2-1);
	
	ctx.beginPath();
	ctx.moveTo(3*end1+lettering, y*spacing);
	ctx.lineTo(3*end2+lettering, y*spacing);
	ctx.stroke();
	ctx.closePath();
}
function switchColor(letter, setColor){
	switch(letter){
		case "a":
			if(setColor){
				aColor = aColor=="red" ? "blue" : "red";
			}
			return aColor;
			break;
		case "b":
			if(setColor){
				bColor = bColor=="red" ? "blue" : "red";
			}
			return bColor;
			break;
		case "c":
			if(setColor){
				cColor = cColor=="red" ? "blue" : "red";
			}
			return cColor;
			break;
		case "d":
			if(setColor){
				dColor = dColor=="red" ? "blue" : "red";
			}
			return dColor;
			break;
	}
}