/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from "react"
import { transitions } from "../utils/styles"
import presents, { colors } from "../utils/presets"

// Import Futura PT typeface
import "../fonts/futurapt_book_macroman/stylesheet.css"
import "../fonts/futurapt_bookitalic_macroman/stylesheet.css"
import "../fonts/futurapt_demi_macroman/stylesheet.css"
import "../fonts/futurapt_demiitalic_macroman/stylesheet.css"

// import "../backup/layout.css"

//普通布局，仅包含正常的页脚，不包含其他东西
export class Layout extends React.Component {
    render() {
        return (
           <div css={styles.container}>
               <div css={styles.content}>
                   {this.props.children}
               </div>
                <footer css={styles.footer}>
                    <span>© {new Date().getFullYear()}. Built by</span>
                    <a css={styles.aTag} href="mailto:keguigong@gmail.com">@keguigong</a>
                    <span>with</span>
                    <a href="http://gatsbyjs.org" target="blank" css={styles.aTag}>
                        <svg viewBox="0 0 1200 1200">
                            <path d="M600 0C268.6 0 0 268.6 0 600s268.6 600 600 600 600-268.6 600-600S931.4 0 600 0zM266.6 933.3C176.1 842.8 131 724.6 129.6 606L594 1070.4c-118.6-1.4-236.8-46.5-327.4-137.1zm437.7 126.1L140.6 495.7c47.5-210.1 235-367.1 459.4-367.1 156.9 0 295.5 77 381.2 194.9L915.6 379C845.8 279.5 730.5 214.3 600 214.3c-167.7 0-310.3 107.7-363.3 257.5l491.6 491.6c123.4-43.7 218-148.2 247.6-277.6H771.4V600h300c0 224.5-157 411.9-367.1 459.4z" />
                        </svg>
                        <span>Gatsby.js</span>
                    </a>
                    <span>.</span>
                </footer>
           </div>
        );
    }
}

const styles = {
    "container": {
        display: 'flex',
        flexDirection: 'column',
        minHeight: `100vh`,
        a: {
            textDecoration: `none`
        },
        // paddingBottom: 'env(safe-area-inset-bottom)'
    },
    "content": {
        flexGrow: 1,
    },
    "footer": {
        display: 'flex',
        alignItems: 'center',
        color: colors.nio.gray,
        padding: '1rem',
        [presents.Small]: {
            fontSize: '0.75em',
            justifyContent: 'center',
        },
        [presents.Mobile]: {
            justifyContent: 'center',
        },
        [presents.Tablet]: {
            justifyContent: 'flex-end',
        }
    },
    "aTag": {
        display: 'flex',
        alignItems: 'center',
        color: colors.nio.grayDarken1,
        fontWeight: 'bold',
        margin: 'auto 0.1rem',
        "svg": {
            marginRight: '0.1rem',
            height: '1.25em',
            fill: colors.nio.grayDarken1,
            transition: transitions.default
        },
        ":hover": {
            color: colors.nio.red,
            textDecoration: 'none',
            "svg": {
                fill: colors.gatsby,
            }
        },
    }
}

//主页显示风格，全屏显示，页脚和名字绝对定位
export class LayoutA extends React.Component {
    render() {
        return (
            <div css={styles.container}>
                <div css={styles.content}>
                    {this.props.children}
                </div>
                <footer css={stylesA.footer}>
                    <span>© {new Date().getFullYear()}. Built by</span>
                    <a css={styles.aTag} href="mailto:keguigong@gmail.com">@keguigong</a>
                    <span>with</span>
                    <a href="http://gatsbyjs.org" target="blank" css={styles.aTag}>
                        <svg viewBox="0 0 1200 1200">
                            <path d="M600 0C268.6 0 0 268.6 0 600s268.6 600 600 600 600-268.6 600-600S931.4 0 600 0zM266.6 933.3C176.1 842.8 131 724.6 129.6 606L594 1070.4c-118.6-1.4-236.8-46.5-327.4-137.1zm437.7 126.1L140.6 495.7c47.5-210.1 235-367.1 459.4-367.1 156.9 0 295.5 77 381.2 194.9L915.6 379C845.8 279.5 730.5 214.3 600 214.3c-167.7 0-310.3 107.7-363.3 257.5l491.6 491.6c123.4-43.7 218-148.2 247.6-277.6H771.4V600h300c0 224.5-157 411.9-367.1 459.4z" />
                        </svg>
                        <span>Gatsby.js</span>
                    </a>
                    <span>.</span>
                </footer>
            </div>
        );
    }
}

const stylesA = {
    "footer": {
        display: 'flex',
        alignItems: 'center',
        color: colors.nio.gray,
        padding: '1rem',
        [presents.Small]: {
            fontSize: '0.75em',
            justifyContent: 'center',
        },
        [presents.Mobile]: {
            justifyContent: 'center',
        },
        //LayoutA
        [presents.Tablet]: {
            position: 'absolute',
            right: 0,
            bottom: 0,
        },
        [presents.Desktop]: {
            justifyContent: 'flex-end',
        },
    },
}

//显示纯文本等，两边留有空白
export class LayoutB extends React.Component {
    render() {
        return (
            <div css={styles.container}>
                <div css={stylesB.content}>
                    {this.props.children}
                </div>
                <footer css={styles.footer}>
                    <span>© {new Date().getFullYear()}. Built by</span>
                    <a css={styles.aTag} href="mailto:keguigong@gmail.com">@keguigong</a>
                    <span>with</span>
                    <a href="http://gatsbyjs.org" target="blank" css={styles.aTag}>
                        <svg viewBox="0 0 1200 1200">
                            <path d="M600 0C268.6 0 0 268.6 0 600s268.6 600 600 600 600-268.6 600-600S931.4 0 600 0zM266.6 933.3C176.1 842.8 131 724.6 129.6 606L594 1070.4c-118.6-1.4-236.8-46.5-327.4-137.1zm437.7 126.1L140.6 495.7c47.5-210.1 235-367.1 459.4-367.1 156.9 0 295.5 77 381.2 194.9L915.6 379C845.8 279.5 730.5 214.3 600 214.3c-167.7 0-310.3 107.7-363.3 257.5l491.6 491.6c123.4-43.7 218-148.2 247.6-277.6H771.4V600h300c0 224.5-157 411.9-367.1 459.4z" />
                        </svg>
                        <span>Gatsby.js</span>
                    </a>
                    <span>.</span>
                </footer>
            </div>
        );
    }
}

const stylesB = {
    //LayoutB
    "content": {
        flexGrow: 1,
        maxWidth: `960px`,
        margin: `0 1rem`,
        width: `100%`,
        [presents.Tablet]: {
            margin: `0 auto`
        }
    },
}
