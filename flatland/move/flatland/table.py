# Copyright (c) Mysten Labs, Inc.
# SPDX-License-Identifier: Apache-2.0

import math

sides = range(3, 15)
offset = -math.pi / 2
radius = 50
c_x = 100
c_y = 100

strings = []
for side in sides:
    angle = 2 * math.pi / side
    s = []
    for i in range(side):
        x, y = c_x + radius * math.cos(angle * i + offset), c_y + radius * math.sin(
            angle * i + offset
        )
        s.append(f"{x},{y}")
    strings.append(" ".join(s))
print(strings)
