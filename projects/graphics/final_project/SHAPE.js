var SHAPE = (function() {
   var my = {};

   function addMeshVertices(V, m, n, func) {
      function append(A) {
         for (let i = 0 ; i < A.length ; i++)
            V.push(A[i]);
      }
      for (let j = 0 ; j < n ; j++)
      for (let i = 0 ; i < m ; i++) {
         let A = func( i   /m,  j   /n),
	           B = func((i+1)/m,  j   /n),
             C = func( i   /m, (j+1)/n),
	           D = func((i+1)/m, (j+1)/n);
         append(A); append(B); append(D); // Lower right of square.
         append(D); append(C); append(A); // Upper left of square.
      }
      return V;
   }

   function addDiskVertices(V, n, zSign, z) {
      function f(i) {
         let theta = zSign * 2 * Math.PI * i / n;
	       V.push(Math.cos(theta),Math.sin(theta),z, 0,0,zSign, 0,0);
      }
      for (let i = 0 ; i < n ; i++) {
         f(i  );
         f(i+1);
         V.push(0,0,z, 0,0,zSign, 0,0);
      }
      return V;
   }

   function addTubeVertices(V, n) {
      return addMeshVertices(V, n, 1, function(u, v) {
         let theta = 2 * Math.PI * u;
         let z     = 2 * v - 1;
         let c     = Math.cos(theta);
         let s     = Math.sin(theta);
         return [c,s,z, c,s,0, u,v];
      });
   }

   my.cylinder = function(n) {
      var V = [];
      addDiskVertices(V, n, -1, -1);
      addTubeVertices(V, n);
      addDiskVertices(V, n,  1,  1);
      return V;
   }

   my.rectangleMesh = function(n) {
     var V = [];
       for(x=0; x<n; x++){
         y=0;

         //V.push(x+1/n-.5,y+1-.5,0, 0,0,1, x+1/n,y+1/n); //top right
         //V.push(x+1/n-.5,y-.5,0, 0,0,1, x+1/n,y/n);     //bottom right
         //V.push(x/n-.5,y-.5,0, 0,0,1, x/n,y/n);     //bottom left
         //V.push(x/n-.5,y+1-.5,0, 0,0,1, x/n,y+1/n);     //top left


         V.push((x/n)-(.5),y+1-.5,0, 0,0,1, x/n,y+1);     //top left
         V.push(((x+1)/n)-(.5),y+1-.5,0, 0,0,1, (x+1)/n,y+1); //top right
         V.push((x/n)-(.5),y-.5,0, 0,0,1, x/n,y);     //bottom left

         V.push(((x+1)/n)-(.5),y+1-.5,0, 0,0,1, (x+1)/n,y+1); //top right
         V.push(((x+1)/n)-(.5),y-.5,0, 0,0,1, (x+1)/n,y);     //bottom right
         V.push((x/n)-(.5),y-.5,0, 0,0,1, x/n,y);     //bottom left

         //console.log(x+1/n-.5,y-.5,0);
       }
     return V;
   }

   return my;
})();
