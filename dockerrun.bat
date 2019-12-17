docker kill Stock-Service
docker build --tag llois41/cc_stock_app_repository:cc_stock_service .
docker run -it -d --rm -p 3000:3000 --name Stock-Service llois41/cc_stock_app_repository:cc_stock_service