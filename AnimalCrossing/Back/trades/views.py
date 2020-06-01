from django.shortcuts import render, get_object_or_404
from .models import Article, Comment
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import serializers
from rest_framework.response import Response
from .serializers import UserDetailSerializer, ArticleSerializer, CommentSerializer, ArticleUpdateSerializer, CommentUpdateSerializer
from .models import Article, Comment
from accounts.models import User 
from rest_framework.authtoken.models import Token


@api_view(['POST'])
@permission_classes([AllowAny])
def write(request): # 거래소에 글 하나 올리기
  # fields = ['id', 'title', 'content', 'image', 'category', 'name', 'sort', 'price', 'created_at', 'updated_at', 'user']
  title = request.data.get('title')
  content = request.data.get('content')
  image = request.data.get('image')
  category = request.data.get('category')
  name = request.data.get('name')
  sort = request.data.get('sort')
  price = request.data.get('price')
  user_id = request.data.get('user_id') # 고유한 유저 번호 132 등
  username = request.data.get('username')
  # 할당하기 contents 이상하다 이거
  article = Article()
  article.title = title
  article.content = content
  article.image = image
  article.category = category
  article.name = name
  article.sort = sort
  article.price = price
  article.username = username
  user =  get_object_or_404(User, pk=user_id) 
  article.user = user
  article.save()
  serializer = ArticleSerializer(instance=article)
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def list(request): # 모든 거래소 글 가져오기
  articles = Article.objects.all()
  serializer = ArticleSerializer(articles, many=True)
  return Response(serializer.data)

# 이름 하나에 딸린 글 가져요기
@api_view(['GET'])
@permission_classes([AllowAny])
def sortlist(request, sort):
  print(sort)
  return Response(data)
  # namelist = Article.objects.filter(name==getname)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def detail(request, article_pk):
  article = get_object_or_404(Article, pk=article_pk)
  if request.method == 'GET':
    serializer = ArticleSerializer(article)
    return Response(serializer.data)
  elif request.method == "PUT":
    serializer = ArticleUpdateSerializer(data = request.data, instance=article)
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return Response(serializer.data)
    else: Response({'message': 'put error'})
  else:
    article.delete()
    return Response({'message': 'trade article is successfully deleted'})
    
# 이제 댓글
@api_view(['POST'])
@permission_classes([AllowAny])
def comment(request, article_pk):
  serializer = CommentSerializer(data = request.data)
  user_id = request.data.get('user_id')
  if serializer.is_valid(raise_exception=True):
    serializer.save(article_id = article_pk, user_id=user_id)
  return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
@permission_classes([AllowAny])
def comment_ud(request, comment_pk):
  comment = get_object_or_404(Comment, pk=comment_pk)
  if request.method == 'PUT':
    serializer = CommentUpdateSerializer(data=request.data, instance=comment)
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return Response({'message':'completed comment update'})
  else:
    comment.delete()
    return Response({'message': 'completed comment delete'})

