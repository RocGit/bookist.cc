export const getFileExt = filename => {
  let pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos !== -1) {
    suffix = filename.substring(pos)
  }
  return suffix
}

export const openFileDialog = (accept, callback, multiple = false) => {
  var input = document.createElement('input')
  input.type = 'file'
  input.accept = accept
  if (multiple) {
    input.multiple = multiple
  }
  if (typeof callback === 'function') {
    input.addEventListener('change', callback)
  }
  input.dispatchEvent(new MouseEvent('click'))
}
