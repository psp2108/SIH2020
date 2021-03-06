module.exports = {
    getRoutingTable: function(adjMatrix, source){

        var table = []
        var visited = []
        var inf = 999999
    
        var initializeSingleSource = function(adjMatrix, source){
            for(var i=0; i<adjMatrix.length; i++){
                table.push([]);
                table[i].push(inf);
                table[i].push(-1);
            }
            visited.push(source);
            table[source][0] = 0;
            table[source][1] = source;
        }
    
        var relax = function(adjMatrix, u, v){
            temp = table[u][0] + adjMatrix[u][v]
            if (table[v][0] > temp){
                table[v][0] = temp
                table[v][1] = u
            }
        }
    
        var getMin = function(Q){
            temp = Q[0]
            Q.forEach(function(i){
                if (table[i][0] < table[temp][0]){
                    temp = i
                }
            });
            return temp
        }
    
        var djikstra = function(adjMatrix, source){   
            Q = []
            for(var i=0; i<adjMatrix.length; i++){
                Q.push(i)
            }
            while (Q.length){
                u = getMin(Q)
                Q.splice(Q.indexOf(u),1)
                for(var v=0; v<adjMatrix.length; v++){
                    if( adjMatrix[u][v] == 1){
                        relax(adjMatrix, u, v)
                    }
                }
            }
        }
    
        var formatting = function(){
            var routeTable = [];
            for(var i=0; i<table.length; i++){
                routeTable.push({"t":i,"p":table[i][1]});
            }
            return routeTable;
        }
    
        initializeSingleSource(adjMatrix, source);
        djikstra(adjMatrix, source);
        return formatting();
    }
}