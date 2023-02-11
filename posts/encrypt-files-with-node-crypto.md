---
title: "Encrypt Files with Node Crypto"
date: "2022-07-06"
---

The crypto module offers a way of encapsulating secure credentials to be used as part of a secure HTTPS net or http connection.

It also offers a set of wrappers for OpenSSL's hash, hmac, cipher, decipher, sign and verify methods.

**_Basis_**

- [base64 和 base32 的区别](https://segmentfault.com/a/1190000010857971)
- [对称密钥加密-Wikipedia](https://zh.wikipedia.org/wiki/%E5%B0%8D%E7%A8%B1%E5%AF%86%E9%91%B0%E5%8A%A0%E5%AF%86)
- [公开密钥加密-Wikipedia](https://zh.wikipedia.org/wiki/%E5%85%AC%E5%BC%80%E5%AF%86%E9%92%A5%E5%8A%A0%E5%AF%86)

**_HASH Function_**

- [MD5-Wikipedia](https://zh.wikipedia.org/wiki/MD5)
- [SHA-2-Wikipedia](https://zh.wikipedia.org/wiki/SHA-2)
- [一文读懂 SHA256 算法原理及其实现](https://zhuanlan.zhihu.com/p/94619052)

**_AES_**

- [AES 加密的原理](https://www.cxyxiaowu.com/3239.html)
- [了解 AES 加密算法](https://justinyan.me/post/4356)

**_RSA_**

- [RSA 加密算法-Wikipedia](https://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95)
- [RSA 算法原理（一）](https://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html)
- [RSA 算法原理（二）](https://www.ruanyifeng.com/blog/2013/07/rsa_algorithm_part_two.html)
- [SSH 原理与运用（一）：远程登录](https://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)
- [ECC 和 RSA 老听别人说加密算法，现在给你个机会也了解下](https://zhuanlan.zhihu.com/p/27615345)

**_TLS_**

- [传输层安全性协议-Wikipedia](https://zh.wikipedia.org/wiki/%E5%82%B3%E8%BC%B8%E5%B1%A4%E5%AE%89%E5%85%A8%E6%80%A7%E5%8D%94%E5%AE%9A)
- [X.509-Wikipedia](https://zh.wikipedia.org/wiki/X.509)
- [OpenSSL 与 SSL 数字证书概念贴](https://segmentfault.com/a/1190000002568019)
- [HTTPS 详解一：附带最精美详尽的 HTTPS 原理图](https://segmentfault.com/a/1190000021494676)
- [HTTPS 详解二：SSL / TLS 工作原理和详细握手过程](https://segmentfault.com/a/1190000021559557)
- [浅谈 SSL/TLS 工作原理](https://zhuanlan.zhihu.com/p/36981565)
- [中间人攻击-Wikipedia](https://zh.wikipedia.org/wiki/%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB)
