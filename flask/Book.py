import random
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

# ------------------------------------------------------------------------------------------------
# -----------------------------------##Read CSV##-------------------------------------------------
# ------------------------------------------------------------------------------------------------
def readCSVBooks():
    books = pd.read_csv('api_data/implementation - presentation - books727.csv', index_col=0)
    return books

def readCSVPivotTable():
    countries_combine_pivot = pd.read_csv('api_data/implementation - presentation - booksPivot.csv', index_col=0)
    return countries_combine_pivot

def booksDict():
    books = readCSVBooks()
    books_dict = pd.Series(books.Book-Title.values,index=books.ISBN.values).to_dict()
    return books_dict

def ratedListExtractor(rated_dict):
    rated_list = []
    for i in rated_dict:
        dict_value = list(i.values())
        if dict_value[1]>0:
            rated_list.append(dict_value)
    return rated_list

'''
-*-*-*-*-*-*-*-*-*-*-*-*-
        //COLLAB//
-*-*-*-*-*-*-*-*-*-*-*-*-
'''

def runKNN(countries_combine_pivot):
    # Uses Sparse Matrix
    countries_combine_matrix = csr_matrix(countries_combine_pivot.values)
    # KNN Algorithm
    knn_model = NearestNeighbors(metric = 'cosine', algorithm = 'brute')
    # Fit Matrix into KNN Model
    knn_model.fit(countries_combine_matrix)
    return knn_model


# RECOMMENDED BOOKS LIST FOR ONE BOOK
def recommendCollabOneBook(books3, countries_combine_pivot, ISBN, user_recommendation):
    bookName = list(books3[books3['ISBN']==ISBN]['Book-Title'])[0]
    query_index = list(countries_combine_pivot.index).index(bookName)
    # countries_combine_pivot = Book-Title vs User-ID Table
    # .iloc -> Display row of query_index with User-ID
    # .values -> convert the .iloc to values
    # .reshape(1,-1) -> Convert the single array into array of array
    # .reshape(1,-1) -> .reshape(rows, columns) {1 value indicates 1 row, -1 indicates no proper value for columns}
    countries_combine_reshape = countries_combine_pivot.iloc[query_index,:].values.reshape(1,-1)
    # run KNN Model
    knn_model = runKNN(countries_combine_pivot)
    # distances and indices of output:
    distances, indices = knn_model.kneighbors(countries_combine_reshape, n_neighbors = user_recommendation+1)
    # Final names list for one book
    recommend_collab_names = []
    for i in indices[0][1:]:
        recommend_collab_names.append(countries_combine_pivot.index[i])
    return recommend_collab_names


# FINAL RECOMMENDED COMBINED BOOKS LIST
def recommendCollab(books3, countries_combine_pivot, books_list, user_recommendations):
    # Filter 3+ ratings books    
    high_rated_list = []
    for i in books_list:
        if i[1]>=3:
            high_rated_list.append(i[0])
    # Combine recommended books list    
    recommend_collab_names = []
    for i in high_rated_list:
        recommend_collab_names = recommend_collab_names + recommendCollabOneBook(books3, countries_combine_pivot, i, user_recommendations)
    # Final 10 recommended books list
    # recommend_collab_names = random.sample(recommend_collab_names, user_recommendations)
    return recommend_collab_names


def getBooksDataframeFromNames(books3, recommend_collab_names):
    recommend_collab = books3[books3['Book-Title'].isin(recommend_collab_names)].groupby('Book-Title').first()
    recommend_collab = recommend_collab.sort_values(by='Avg-Rating', ascending=False)
    recommend_collab.reset_index(inplace=True, drop=False)
    return recommend_collab.head(10)