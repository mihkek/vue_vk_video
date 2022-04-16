export const createSrc = (iframeCode) => {
  let testStr = iframeCode.split(' ')
  console.log("All - ", testStr)
  let src = testStr.filter(item => item.includes('src'))
  if(src.length == 0) return null

  var res = src[0].substr(src[0].indexOf('"'), src[0].lastIndexOf('"'))
  res = res.replace('"', '')
  res = res.substr(0, res.length-1)
  res = res.trim()
  res += '&js_api=1'
  // src[0].replace('', '')(/'\\'|'src'||окно/g, function(word) {
  //   var newWord = {
  //     'слон': 'печь',
  //     'мышь': 'мышь',
  //     'авто': 'мото',
  //     'окно': 'рама'
  //    }[word];
  //    return newWord || word;
  //  });
  // res =.replace('src', '').replace('"', '') += '&js_api=1'
  // console.log("Src - ", res)
  return res
}
{/* <iframe src="https://vk.com/video_ext.php?oid=369530671&id=456239141&hash=40d4a4731a529b7e&hd=2" width="853" height="480" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe> */}

export const validateIframeForSrc = (iframeCode) => {
  if(!iframeCode.includes("src")) return false

  return true
}
