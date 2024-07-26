## Basic kube notes

## k3 create cluster with 2 nodes

k3d cluster create -a 2 
k3d cluster create -a 2 --no-lb for no load balancer // k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2

## kubectl see config data

kubectl cluster-info

## Create deployment

kubectl create deployment <deployment name> --image=<docker image name>

### Get kubectl manual

kubectl explain <what to explain> deployment, pods etc


### Upscale deployment

kubectl scale deployment/<deployment name> --replicas=<number>
kubectl set image deployment/<deployment name> <image name>=<full docker path to image>

### Debugging commands

kubectl describe, kubectl logs, kubectl delete

Use Lens for GUI presentation

### Port forwarding commands

kubectl port-forward <pod name> <localhost port>:<inner container pods>

### Ingress logic

Define what port u want in kube container to use in deployment.yaml
This becomes your targetPort in service.yaml
Use port in service.yaml to tell which port u actually want to use for the service(?)
In ingress re route the port to http ie port 80 and that gets routed out to localhost on 8081 if u created cluster that way.

### Kubernetes storage

Static Method
Persistet volumes - independent from pods, made by admin.
Persistent volume claims - Are reuests for the storage ?

Dynamic Method
Storage classes - Templates for storage, when request is made then template gets used to create storage solution


We use NFS storage and Longhorn

### Creating a Persistent Volume in a local cluster via docker

docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube

## Networking between Pods

### Cluster IP service 

When a cluster IP service is created for a pod such as todo-backend-svc then the service creates a cluster internal IP address that other pods can use to access the service,

    - port: 2345
      protocol: TCP
      targetPort: 3000

Manual debugging can be done by using busybox (light weight distro for debugging)

    image: busybox

Oneliner to send command to running pod

    kubectl exec -it < debug pod name > -- wget -qO - http://< service name >:< PORT >
    kubectl exec -it < debug pod name > sh  # to get a shell

Can also use internal IP from kubectl get svc command. Or IP of the actual pod from kubectl describe < pod name > but then remember to use targetPort in the http command.



