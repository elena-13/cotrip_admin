const parseVideo = (url) => {
  url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\S+)?/);
  let type = '';
  if (RegExp.$3.indexOf('youtu') > -1) {
    type = 'youtube';
  } else if (RegExp.$3.indexOf('vimeo') > -1) {
    type = 'vimeo';
  }

  return {
    type,
    id: RegExp.$6,
  };
};

function getUrlVideo(url) {
  const videoObj = parseVideo(url);
  let newUrl;
  if (videoObj.type === 'youtube') {
    newUrl = `//www.youtube.com/embed/${videoObj.id}`;
  } else if (videoObj.type === 'vimeo') {
    newUrl = `//player.vimeo.com/video/${videoObj.id}`;
  }
  return newUrl;
}

export { getUrlVideo };
