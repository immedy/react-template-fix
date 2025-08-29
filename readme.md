# 1. Aktifkan registry (sekali saja)

microk8s enable registry

# 2. Buat ulang secret .env

microk8s kubectl delete secret library-app-env
microk8s kubectl create secret generic library-app-env --from-file=.env=.env.production

# 3. Build dan push Docker image ke registry lokal

docker build -t ambulance-app .
docker tag ambulance-app localhost:32000/ambulance-app
docker push localhost:32000/ambulance-app:latest

# 4. Deploy ke Kubernetes

microk8s kubectl apply -f microk8s/app_deployment.yaml
microk8s kubectl apply -f microk8s/app_service.yaml

microk8s kubectl delete deployment ambulance-app
microk8s kubectl delete service ambulance-app


# 5. Cek hasilnya

microk8s kubectl get pods
microk8s kubectl logs <nama-pod>
microk8s kubectl get svc library-app
microk8s kubectl delete svc library-app

# 5. Rollout app_deployment/yaml

microk8s kubectl rollout restart deployment library-app

# 7. delete Pod

microk8s kubectl delete pod app-absensi-5fcd857694-md6v8
microk8s kubectl delete pod app-absensi-5fcd857694-s9gnk
Cek Log app

microk8s kubectl logs -f library-app-59595bbb67-zl6c4
microk8s kubectl describe pod library-app-59595bbb67-zl6c4     
