---
layout: post
title: MLX Framework
subtitle : (Grammar)
tags: [mlx, language]
# feature-title: Korea Univ.
feature-img: "assets/img/mlx_logo.jpg"
---

💻 MLX Common sense for beginners

## 🚀 MLX (Apple Silicon DL Framework)

> Key Idea : Lazy computation Management 

<br>
```
import mlx.core as mx
import mlx.nn as nn
```

<br>
### 🛠 

#### *1. mx.eval(\*args)*

```
# The model is created with all its parameters but nothing is initialized
# yet because MLX is lazily evaluated
mlp = MLP(2, 10)

mx.eval(model.parameters())
```

여기서 eval()은 본래 model이 선언이 되더라도 lazy computation에 의해서 meterialize되어 있지 않은데,<br>
강제로 model parameters dict에 eval을 적용함으로써 모델을 초기화해주는 역할을 한다.

#### *2. nn.value_and_grad*

```
value_and_grad(model: Module, fn: Callable)
```

Transform the passed function fn to a function that computes the gradients of fn wrt the model’s trainable parameters and also its value.<br>

- fn : loss function<br>
- model : target model to calculate gradient for trainable params<br>
- return : A callable that returns the value of `fn` and the gradients wrt the trainable parameters of `model`<br>






<br>
### 📌 References
🧷 https://ml-explore.github.io/mlx-data/build/html/index.html<br>
🧷 https://ml-explore.github.io/mlx/build/html/index.html<br>
🧷 https://spsarolkar.github.io/rouge-theme-preview/<br>
<!-- 🧷 https://blog.jaeyoon.io/2017/12/jekyll-image.html<br> -->

<!-- --- -->
<!-- 
#### Contact
📞 **Phone** : +82 10-6654-9551 <br>
📧 **Email** : [kdhluck@naver.com](mailto:kdhluck@naver.com) -->