class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr, 0, arr.length - 1);

    function buildTree(arr, start, end) {
      if (start > end) {
        return;
      }

      const mid = Math.floor((start + end) / 2);

      const node = new Node(arr[mid]);

      node.left = buildTree(arr, start, mid - 1);
      node.right = buildTree(arr, mid + 1, end);

      return node;
    }
  }

  insert(data) {
    const node = new Node(data);

    if (!this.root) {
      this.root = node;
      return;
    }

    let current = this.root;

    while (current) {
      if (data < current.data) {
        if (!current.left) {
          current.left = node;
          return;
        } else {
          current = current.left;
        }
      } else if (data > current.data) {
        if (!current.right) {
          current.right = node;
          return;
        } else {
          current = current.right;
        }
      } else {
        return;
      }
    }
  }

  delete(data) {
    if (!this.root) {
      return;
    }

    let current = this.root;

    while (current) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        if (current.left && current.right) {
          let tempNode = current.right;

          while (tempNode.left) {
            tempNode = tempNode.left;
          }
          current.data = tempNode.data;
          for (let key in tempNode) {
            delete tempNode[key];
          }
        } else if (current.left) {
          for (let key in current) {
            current[key] = current.left[key];
          }
        } else if (current.right) {
          for (let key in current) {
            current[key] = current.right[key];
          }
        } else {
          for (let key in current) {
            delete current[key];
          }
        }

        return;
      }
    }
  }

  find(data) {
    if (!this.root) {
      return;
    }

    let current = this.root;

    while (current) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        return current;
      }
    }

    return null;
  }

  levelOrder() {
    if (!this.root) {
      return;
    }

    const res = [];

    const queue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      const current = queue[0];
      res.push(current.data);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
      queue.shift();
    }

    return res;
  }

  preorder() {
    const res = [];

    const preorderHelper = (node) => {
      if (!node) {
        return null;
      }

      res.push(node.data);
      if (node.left) {
        preorderHelper(node.left);
      }
      if (node.right) {
        preorderHelper(node.right);
      }
    };

    preorderHelper(this.root);
    return res;
  }

  inorder() {
    const res = [];

    const inorderHelper = (node) => {
      if (!node) {
        return null;
      }

      if (node.left) {
        inorderHelper(node.left);
      }
      res.push(node.data);
      if (node.right) {
        inorderHelper(node.right);
      }
    };

    inorderHelper(this.root);
    return res;
  }

  postorder() {
    const res = [];

    const postorderHelper = (node) => {
      if (!node) {
        return null;
      }

      if (node.left) {
        postorderHelper(node.left);
      }
      if (node.right) {
        postorderHelper(node.right);
      }
      res.push(node.data);
    };

    postorderHelper(this.root);
    return res;
  }

  height(node) {
    if (node === null || node === undefined) {
      return -1;
    }

    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  isBalanced(node) {
    if (node === null || node === undefined) {
      return true;
    }

    let lh = this.height(node.left);
    let rh = this.height(node.right);

    if (
      Math.abs(lh - rh) <= 1 &&
      this.isBalanced(node.left) === true &&
      this.isBalanced(node.right) === true
    ) {
      return true;
    }

    return false;
  }
}
