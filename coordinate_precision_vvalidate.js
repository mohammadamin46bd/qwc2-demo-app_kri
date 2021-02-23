qwc2=[
[190799.2172916667, 6212238.390416667],
[190854.6475, 6212268.076666667],
[190838.42854166665, 6212301.04375],
[190781.94, 6212272.204166668]
]




pgis=[
[190799.229607998, 6212238.34575468],
[190781.991117517, 6212272.15775241],
[190854.669611509, 6212268.03884267],
[190838.450540919, 6212301.01152394]
]

deltaX=0;deltaY=0;meanDelX=0;meanDelY=0;
for(var i=0;i<qwc2.length;i++){ 
deltaX=deltaX + Math.abs((qwc2[i][0]-pgis[i][0]));
deltaY=deltaY + Math.abs((qwc2[i][1]-pgis[i][1]) ); 
}; 
meanDelX=deltaX/qwc2.length;meanDelY=deltaY/qwc2.length;
console.log(meanDelX);
console.log(meanDelY);