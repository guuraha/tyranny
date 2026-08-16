gsap.registerPlugin(ScrollTrigger);
const lenis=new Lenis({autoRaf:false,lerp:.09,smoothWheel:true,syncTouch:true});
lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(1000,16);
const intro=gsap.timeline({defaults:{ease:'power3.out'}});
intro.set('.top-label',{y:-10}).set('.portrait-wrap',{scale:.92,opacity:0,filter:'blur(15px)'}).set('.orbit-main,.orbit-eye',{scale:.82,opacity:0}).set('.moon-glow',{opacity:0}).set('.water',{y:30,opacity:0})
.to('.top-label',{opacity:.55,y:0,duration:1.2},.1).to('.moon-glow',{opacity:1,duration:2},.2).to('.portrait-wrap',{scale:1,opacity:1,filter:'blur(0)',duration:2.2},.45).to('.orbit-main',{scale:1,opacity:1,duration:1.5},.9).to('.orbit-eye',{scale:1,opacity:1,duration:1.3},1.1).to('.water',{y:0,opacity:1,duration:1.8},.75).to('.scroll-cue',{opacity:.6,duration:1},2.4);
gsap.to('.moon-glow',{scale:1.08,opacity:.8,duration:3,repeat:-1,yoyo:true,ease:'sine.inOut'});
// 페이지 전환은 snap으로 처리하고, 첫 화면은 회전 자체가 계속 진행됩니다.
gsap.to('.portrait-wrap',{scale:.96,y:'-3vh',opacity:.72,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1.5}});
gsap.to('.orbit-main',{scale:1.05,opacity:.65,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1.5}});
['#page2','#page3','#page4','#page5'].forEach(sel=>{const el=document.querySelector(sel);if(!el)return;gsap.from(el.querySelectorAll('.under-copy,.story-line,.guide-inner>*'),{y:35,opacity:0,filter:'blur(8px)',duration:1.15,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 68%',toggleActions:'play none none reverse'}})});
window.addEventListener('load',()=>ScrollTrigger.refresh());document.fonts?.ready.then(()=>ScrollTrigger.refresh());
