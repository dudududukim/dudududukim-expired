---
layout: post
title: Torch (mps)
subtitle : (Grammar)
tags: [mlx, language]
# feature-title: Korea Univ.
# feature-img: "assets/img/mlx_logo.jpg"
---

🧨 PyTorch Common sense for beginners

## 🚀 Torch (device='mps')

> Key Idea : Universial ML Framework for every AI

<br>
```
import torch
import numpy as np
```

<br>
### 🛠 Implementation errors

#### *<br>1. Adavptive average pool2d not supported in MPS*


RuntimeError: Adaptive pool MPS: input sizes must be divisible by output sizes. Non-divisible input sizes are not implemented on MPS device yet. For now, you can manually transfer tensor to cpu in this case. Please refer to [this issue](https://github.com/pytorch/pytorch/issues/96056)

어이가 없다, 처음에 orthogonal weight initializatione도 안되도 mps detach했다고 다시 mps로 올렸는데, adaptive pool 2d도 안된다.
다행인 점이 전과 다르게, github issue를 보여준다.

추가 issue url : https://github.com/pytorch/pytorch/issues/143864 <br>


#### *<br>2. warnings.simplefilter("error")*

사실 소프트웨어 진영에서의 warning의 역할은 어느정도의 무게인지 모르겠지만, hardware 영역에서의 warning은 아주 치명적이다.<br>
특히 functionality 측면에서 testing하는 vector들에서는 잘 작동할지 몰라도 EDA나 P&R로 넘어가면서 실제 칩으로 제작되는 과정에서는 warning이 wiring을 못하게 할 수도 있고, <br>
아무도 모르는 사이에 특정 모듈을 제외하고 컴파일 했을 수도 있기 때문이다. <br>

그래서 지금 모델의 학습에 있어서도 

```
/Users/kimduhyeon/Desktop/d2f/d2f/lib/python3.13/site-packages/torch/nn/modules/instancenorm.py:115: UserWarning: input's size at dim=1 does not match num_features. You can silence this warning by not passing in num_features, which is not used because affine=False
  warnings.warn(
```

다음과 같은 dimension not mathcing과 같은 warning 들을 error로 바꾸어서 evoke한 위치를 바타으로 debugging을 진행하려고 한다.


### *<br>3. [Errno 24] Too many open files:*

num_workers에 따른 OS의 file descriptor 제한을 초과

<br>
### 📌 References
🧷 https://pytorch.org/tutorials/beginner/pytorch_with_examples.html <br>

#### 🤌 issues

🧷 https://github.com/pytorch/pytorch/issues/141287 <br>
🧷 
<!-- 🧷 https://blog.jaeyoon.io/2017/12/jekyll-image.html<br> -->

<!-- --- -->
<!-- 
#### Contact
📞 **Phone** : +82 10-6654-9551 <br>
📧 **Email** : [kdhluck@naver.com](mailto:kdhluck@naver.com) -->