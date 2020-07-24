# Nodejs Cluster Module

This is just to experiment with the cluster module

```if(cluster.isMaster) {
  ...
  cluster.fork()
}```

The ```if``` statement above is to check if the process running is the master process,
if its true, then it goes ahead to fork child processes which are spawn up depending on
the number of our cpu cores which is given by:
```e.g const cpuCount = os.cpu().length```

```else {
  const app = express()
  .... routes here
}```

In the resulting ```else``` block we go ahead to instantiate the express server, and add our routes. Now depending on the number of cpu cores, we spin up servers which correlates to our cpu cores.

Finally, ```cluster.on('exit')``` is an event that is listening to the entire process, incase a worker process should suddenly die out, ```cluster.fork``` spins another process to replace the process that died out, hence keeping our servers running on all cores. This is very efficient for scaling our servers. So if we have a function that does high cpu intensive tasks, the servers can still respond to multiple requests

