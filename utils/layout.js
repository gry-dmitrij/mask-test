/**
 * Возвращает вычисленное значение CSS
 *
 * @example
 * // получаем значение в пикселях
 * computeCssExpression('calc(var(--mw) * 100)')
 *
 * @param {string} cssExpression CSS-выражение
 * @returns {string} вычисленное значение
 */
export const computeCssExpression = function (cssExpression) {
  const dummy = document.createElement('div')
  dummy.style.width = cssExpression
  dummy.style.pointerEvents = 'none'
  dummy.style.position = 'absolute'
  dummy.style.top = 0
  dummy.style.left = 0
  document.body.appendChild(dummy)
  const val = getComputedStyle(dummy).getPropertyValue('width')
  dummy.remove()
  return val
}
