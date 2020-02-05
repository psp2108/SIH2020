

var getRoutingTable = function(adjMatrix, source){

    table = []
    visited = []
    var inf = 9999999

    var initializeSingleSource = function(adjMatrix, source){
        for(var i=0; i<adjMatrix.length; i++){
            table.append([]);
            table[i].append(inf);
            table[i].append(-1);
        }
        visited.append(source);
        table[source][0] = 0;
        table[source][1] = 0;
    }

    var relax = function(adjMatrix, u, v){
        temp = table[u][0] + graph[u][v]
        if (table[v][0] > temp){
            table[v][0] = temp
            table[v][1] = u
        }
    }

    var getMin = function(Q){
        temp = Q[0]
        foreach(Q, function(i){
            if (table[i][0] < table[temp][0]){
                temp = i
            }
        });
        return temp
    }

    var djikstra = function(graph, s){   
        Q = []
        for(var i=0; i<graph.length; i++){
            Q.append(i)
        }
        while (Q != []){
            u = getMin(Q)
            Q.remove(u)
            for(var v=0; v<graph.length; v++){
                if( graph[u][v] != inf){
                    relax(graph, u, v)
                }
            }
        }
    }
}