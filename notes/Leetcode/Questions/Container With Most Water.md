# Container With Most Water

- https://leetcode.com/problems/container-with-most-water/

# Solution

- https://www.youtube.com/watch?v=UuiTKBwPgAo

```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        maxArea = 0
        left = 0
        right = len(height) - 1
        
        while left != right:
            area = min(height[left], height[right]) * (right - left)
            
            if area > maxArea:
                maxArea = area
                
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
                    
        return maxArea
```