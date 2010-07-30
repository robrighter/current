## Current

Runs with **Node v0.1.102**

To run current you need to remember 2 things:

1. Make sure the interface is set correctly in the `tcpdump` command:
   
   On a Macbook en0 = ethernet en1 = wifi (usually)

2. Always run it with sudo:

   `sudo node pollDataServer.js`