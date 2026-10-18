(()=>{
  const grid=document.getElementById('video-grid');
  const status=document.getElementById('video-gallery-status');
  const search=document.getElementById('video-search');
  const prev=document.getElementById('video-prev');
  const next=document.getElementById('video-next');
  const pageInput=document.getElementById('video-page-number');
  const pageGo=document.getElementById('video-page-go');
  const pageLabel=document.getElementById('video-page-label');
  if(!grid||!status)return;

  const pageSize=20;
  const scriptUrl=document.currentScript?.src||location.href;
  const numberFormat=new Intl.NumberFormat('en-US');
  const dateFormat=new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'Asia/Dhaka'});
  let videos=[];
  let page=1;

  function thumbUrl(video){
    const value=String(video.thumbnail||'');
    if(/^https:\/\//i.test(value))return value;
    return new URL(value||`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,new URL('.',scriptUrl)).href;
  }

  function makeCard(video){
    const article=document.createElement('article');
    article.className='video-card';
    article.setAttribute('data-reveal','');

    const button=document.createElement('button');
    button.type='button';
    button.className='video-preview';
    button.dataset.videoId=video.id;
    button.dataset.videoTitle=video.title;
    button.setAttribute('aria-label',video.title+' — ভিডিওটি এই পেজে চালান');

    const image=document.createElement('img');
    image.src=thumbUrl(video);
    image.alt=video.title+' — ভিডিও thumbnail';
    image.loading='lazy';
    image.decoding='async';
    image.addEventListener('error',()=>{
      if(image.dataset.fallback)return;
      image.dataset.fallback='1';
      image.src=`https://i.ytimg.com/vi/${encodeURIComponent(video.id)}/mqdefault.jpg`;
    });
    button.append(image);

    const play=document.createElement('span');
    play.className='play-button';
    play.setAttribute('aria-hidden','true');
    play.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>';
    button.append(play);

    const info=document.createElement('div');
    info.className='video-info';
    const channel=document.createElement('span');
    channel.className='video-channel-label';
    channel.textContent=video.channelTitle||'YouTube';
    const heading=document.createElement('h3');
    heading.textContent=video.title;
    const note=document.createElement('span');
    note.className='video-inline-note';
    note.textContent='ভিডিওটি এই পেজেই চলবে';
    info.append(channel,heading);
    if(video.publishedAt){
      const time=document.createElement('time');
      time.dateTime=video.publishedAt;
      const date=new Date(video.publishedAt);
      if(!Number.isNaN(date.getTime()))time.textContent=dateFormat.format(date);
      info.append(time);
    }
    info.append(note);
    article.append(button,info);
    return article;
  }

  function render(){
    const query=(search?.value||'').trim().toLocaleLowerCase();
    const matches=query?videos.filter(video=>`${video.title} ${video.channelTitle}`.toLocaleLowerCase().includes(query)):videos;
    const pages=Math.max(1,Math.ceil(matches.length/pageSize));
    page=Math.min(Math.max(1,page),pages);
    const start=(page-1)*pageSize;
    const pageVideos=matches.slice(start,start+pageSize);
    grid.replaceChildren(...pageVideos.map(makeCard));
    grid.dataset.count=String(pageVideos.length);

    if(!matches.length){
      status.textContent='এই নামে কোনো ভিডিও পাওয়া যায়নি।';
    }else{
      status.textContent=`মোট ${numberFormat.format(matches.length)}টি ভিডিও · পৃষ্ঠা ${numberFormat.format(page)} / ${numberFormat.format(pages)} · এক পৃষ্ঠায় ${pageSize}টি`+(query?' · খোঁজার ফলাফল':' · নতুন ভিডিও স্বয়ংক্রিয়ভাবে যোগ হয় না');
    }
    if(pageLabel)pageLabel.textContent=`পৃষ্ঠা ${numberFormat.format(page)} / ${numberFormat.format(pages)}`;
    if(pageInput){pageInput.max=String(pages);pageInput.value=String(page);pageInput.disabled=pages<=1;}
    if(prev)prev.disabled=page<=1;
    if(next)next.disabled=page>=pages;
    if(pageGo)pageGo.disabled=pages<=1;
  }

  function goToPage(value,scroll=false){
    const pages=Math.max(1,Math.ceil((search?.value?videos.filter(video=>`${video.title} ${video.channelTitle}`.toLocaleLowerCase().includes(search.value.trim().toLocaleLowerCase())).length:videos.length)/pageSize));
    const target=Number.parseInt(value,10);
    if(!Number.isFinite(target))return;
    page=Math.max(1,Math.min(pages,target));
    render();
    if(scroll)document.getElementById('video-gallery')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  search?.addEventListener('input',()=>{page=1;render();});
  prev?.addEventListener('click',()=>goToPage(page-1,true));
  next?.addEventListener('click',()=>goToPage(page+1,true));
  pageGo?.addEventListener('click',()=>goToPage(pageInput?.value,true));
  pageInput?.addEventListener('keydown',event=>{if(event.key==='Enter')goToPage(pageInput.value,true);});

  const catalogUrl=new URL('youtube-videos.json',new URL('.',scriptUrl));
  fetch(catalogUrl.href,{cache:'no-cache'})
    .then(response=>{if(!response.ok)throw new Error(`Catalogue request failed (${response.status})`);return response.json();})
    .then(data=>{
      if(!Array.isArray(data)||!data.length)throw new Error('Catalogue is empty or malformed');
      videos=data.filter(video=>video&&/^[\w-]{11}$/.test(video.id||'')&&typeof video.title==='string');
      if(!videos.length)throw new Error('No valid video records');
      page=1;
      render();
    })
    .catch(error=>{
      console.warn('Static YouTube catalogue could not be loaded:',error);
      status.textContent='ভিডিও তালিকা লোড হয়নি; আপাতত সংরক্ষিত প্রথম ২০টি ভিডিও দেখানো হচ্ছে।';
      if(prev)prev.disabled=true;if(next)next.disabled=true;if(pageGo)pageGo.disabled=true;if(pageInput)pageInput.disabled=true;
    });
})();
