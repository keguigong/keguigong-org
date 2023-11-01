---
title: 'VeriLog中如何使用wire？记初见wire遇到的问题'
excerpt: '最近正在学习VeriLog，但是对于一些数据类型使用上还不够熟练。'
date: '2023-10-20'
author: keguigong
---

> [Verilog](https://zh.wikipedia.org/wiki/Verilog) 是一种用于描述、设计电子系统的硬件描述语言，主要用于在集成电路设计。既可以在晶体管级、逻辑门级进行描述，也可以在寄存器传输级对电路信号在寄存器之间的传输情况进行描述。

## 使用场景

实现一个 PWM 控制器的模块，可以实现输入基础时钟以及周期数，输出对应频率的 PWM 控制信号，最后的输出形式为 `wire` 类型，用于传递到其他模块使用。

大概原理是根据时钟信号的上升沿进行计数，计数满了进行一次输出信号的反转，以此来输出控制信号。

模块声明如下：

```verilog
module PWMcontroller(clk_5MHz, countStart, reset, beep);

input clk_5MHz; // 时钟信号
input [13:0] countStart; // 周期计数
input reset; // 重置信号
output beep; // 输出信号
```

实现的时候通过上升沿进行触发。

```verilog
reg [13:0] count;
reg [1:0] flag;

always @(posedge clk_5MHz) begin
    if (reset)
    begin
        count <= 0;
        flag <= 1'b0;
    end else begin
        if (countStart > 0) begin
            if (count < countStart) begin
                count <= count + 1;
            end else begin
                count <= 0;
                flag <= ~flag;
            end
        end else begin
            flag <= 1'b0;
    end
    beep <= flag;
end
```

这样直接运行会出现问题，wire 并不能直接被赋值，而需要一个中间寄存器。

```verilog
reg beep_r;

always @(posedge clk_5MHz) begin
    // ...
    beep_r <= flag;
end

assign beep = beep_r;
```

通过中间寄存器，即可实现将信号输出到 wire 上。

需要注意的点如下：

- wire 类型必须被其他东西驱动而不能用于存储数据
- wire 类型在 `always` 块中不能作为 = 或 <= 的左值
- wire 类型是 `assign` 语句中左值的唯一合法类型

同样的，对于寄存器 `reg`，我们也需要注意：

- reg 类型是 `always` 块中作为 = 或 <= 左值的唯一合法类型
- reg 类型能用于创建寄存器，以用于 `always@(posedge clk)` 块
- reg 类型是 `initial` 块中作为 = 左值的唯一合法类型（用于 TestBench）
- reg 类型不能作为 `assign` 语句的左值

## 参考链接

- [Verilog 中 reg 和 wire 的区别总结](https://zhuanlan.zhihu.com/p/471539431)
