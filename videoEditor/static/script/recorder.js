document.addEventListener("DOMContentLoaded",function(){
    const txtAndImgBannerTxtP = document.getElementsByClassName("txtAndImgBannerTxtP");
    const VideoRecordBtn = document.getElementById("VideoRecordBtn");
    let mediaRecorder;
    let recordedChunks = []
    let mediaStream;

    txtAndImgBannerTxtP[0].addEventListener('click',function(){
        const recorderTag = document.querySelector(".recorderTag")
        const video = document.getElementById("video")

        recorderTag.style.display = ''
        navigator.mediaDevices.getUserMedia({video:true, audio:true})
        .then((stream) => {
            video.srcObject = stream
            mediaStream = stream
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event)=>{
                if (event.data.size > 0){
                    console.log("hahaaa")
                    recordedChunks.push(event.data)
                }
            }
            mediaRecorder.onstop = ()=>{
                console.log("working")
                video.srcObject = null;
                const blob = new Blob(recordedChunks,{type:'video/webm'});
                recordedChunks = [];
                const url = URL.createObjectURL(blob);
                mediaStream.getTracks().forEach(track => track.stop());
                video.src = url;
    
                // video.load()
                video.play()
                console.log(video.src)
            }

            VideoRecordBtn.addEventListener("click",function(event){
                recState = event.currentTarget.getAttribute("startrec")
                console.log(recState)
                if (recState == "true"){
                    console.log("start rec")
                    mediaRecorder.start()
                    event.currentTarget.setAttribute('startrec',"false")
                }
                else if(recState == "false"){
                    console.log("stop rec")
                    mediaRecorder.stop()
                    // event.currentTarget.setAttribute('startrec','true')
                }
            })
        })
                    

    })
    

});
// document.addEventListener("DOMContentLoaded",function(){
//     const txtAndImgBannerTxtP = document.getElementsByClassName("txtAndImgBannerTxtP");
//     const VideoRecordBtn = document.getElementById("VideoRecordBtn");

//     txtAndImgBannerTxtP[0].addEventListener('click',function(){
//         const recorderTag = document.querySelector(".recorderTag")
//         const video = document.getElementById("video")
//         let mediaRecorder;
//         let recordedChunks = [];
//         let isPreviewing = true;
//         let mediaStream

//         recorderTag.style.display = ''
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then(function (stream) {
//                 video.srcObject = stream;
//                 mediaStream = stream
//                 video.play();

//                 mediaRecorder = new MediaRecorder(stream);

//                 mediaRecorder.ondataavailable = function (e) {
//                     if (e.data.size > 0) {
//                         recordedChunks.push(e.data);
//                         if (!isPreviewing) {
//                             switchToPreview(stream);
//                         }
//                     }
//                 };

//                 mediaRecorder.onstop = function () {
//                     const blob = new Blob(recordedChunks, { type: 'video/webm' });
//                     recordedChunks = [];

//                     mediaStream.getTracks().forEach(track => track.stop());
//                     const videoURL = URL.createObjectURL(blob);
//                     video.src = videoURL;
//                     isPreviewing = false;
//                 };

//                 VideoRecordBtn.addEventListener("click",function(event){
//                     recState = event.currentTarget.getAttribute("startrec")
//                     console.log(recState)
//                     if (recState == "true"){
//                         console.log("start rec")
//                         mediaRecorder.start()
//                         event.currentTarget.setAttribute('startrec',"false")
//                     }
//                     else if(recState == "false"){
//                         console.log("stop rec")
//                         mediaRecorder.stop()
//                         event.currentTarget.setAttribute('startrec','true')
//                     }
            
            
//                 })

//             })
//             .catch(function (err) {
//                 console.error('Error accessing media devices:', err);
//             });

//             function switchToPreview(stream) {
//                 const video = document.getElementById('video');
//                 video.srcObject = stream;
//                 video.play();
//                 isPreviewing = true;
//             }

//     })

// });