/**
 * You may copy, distribute and modify the software
 * as long as you track changes/dates in source files.
 * Any modifications to or software including (via compiler)
 * GPL-licensed code must also be made available under
 * the GPL along with build & install instructions.
 *
 * Guilherme Siquinelli <guiseek@gmail.com>
 * Copyleft (ↄ) 2022 - LGPL-3.0
 */

export type IdSelector =
  | `#${string}`
  | `#${string} ${string}`
  | `#${string} > ${string}`
  | `${string}#${string}`

export type ClassSelector =
  | `.${string}`
  | `.${string} .${string}`
  | `.${string} > .${string}`
  | `${string}.${string}`

export type AttributeSelector =
  | `[${string}]`
  | `[${string}] ${string}`
  | `[${string}] > ${string}`
  | `${string}[${string}]`

export function query<Tag extends keyof SVGElementTagNameMap>(
  selector: Tag | AttributeSelector | ClassSelector | IdSelector,
  parentElement?: HTMLElement
): SVGElementTagNameMap[Tag]

export function query<Tag extends keyof HTMLElementTagNameMap>(
  selector: Tag | AttributeSelector | ClassSelector | IdSelector,
  parentElement?: HTMLElement
): HTMLElementTagNameMap[Tag]

export function query<
  Tag extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
>(
  selector: Tag | AttributeSelector | ClassSelector | IdSelector,
  parentElement: HTMLElement | SVGElement = document.body
) {
  return parentElement.querySelector(selector)
}

export function queryAll<Tag extends keyof SVGElementTagNameMap>(
  selector: Tag | AttributeSelector | ClassSelector | IdSelector,
  parentElement?: HTMLElement
): NodeListOf<SVGElementTagNameMap[Tag]>

export function queryAll<Tag extends keyof HTMLElementTagNameMap>(
  selector: Tag | AttributeSelector | ClassSelector | IdSelector,
  parentElement?: HTMLElement
): NodeListOf<HTMLElementTagNameMap[Tag]>

export function queryAll<
  Tag extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
>(
  selector: Tag | AttributeSelector | ClassSelector | IdSelector,
  parentElement: HTMLElement | SVGElement = document.body
) {
  return parentElement.querySelectorAll(selector)
}
